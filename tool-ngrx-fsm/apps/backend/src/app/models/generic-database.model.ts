import { ValidateFunction } from 'ajv/dist/jtd';
import { v4 as uuid } from 'uuid';

import { DATABASE_SCHEMAS, DatabaseConfiguration } from '../configs/database.configuration';

type XXX = Record<string, any> & { id: string };

export class GenericDatabaseModel<X extends XXX = XXX, Y extends XXX = XXX, Z extends XXX = XXX> {
    readonly Schema: DATABASE_SCHEMAS;
    readonly Ref: string;
    readonly validate: ValidateFunction<X>;
    readonly database: DatabaseConfiguration;
    private populationKeys: { idKey: keyof X; key: keyof Y; model: GenericDatabaseModel }[] = [];

    protected addPopulationKey(idKey: keyof X, key: keyof Y, model: GenericDatabaseModel) {
        this.populationKeys.push({ idKey, key, model });
    }

    public async create(input: X): Promise<X> {
        const id = uuid();

        const newOne: X = {
            ...input,
            id
        };

        if (!this.validate(newOne)) {
            throw this.validate.errors;
        }

        this.createDbModel(newOne);

        return newOne;
    }

    public getAll(): X[] {
        const entities = this.database.db.getObject<Record<string, X>>(this.Ref);

        return Object.values(entities).reduce((previousValue: X[], currentValue: X): X[] => [...previousValue, currentValue], []);
    }

    public getAllPopulated(): Y[] {
        const all = this.getAll();

        return all.map((x: X): Y => this.findByIdPopulated(x.id));
    }

    public findById(id: string | null): X | null {
        const path = [this.Ref, id].join('/');

        if (!id) {
            return null;
        }

        if (!this.database.db.exists(path)) {
            return null;
        }

        return this.database.db.getObject<X>(path);
    }

    public findByIdPopulated(id: string): Y {
        const one = this.findById(id);

        if (!one) {
            throw 'NOT_FOUND_FOR_POPULATION';
        }

        const populatedKeys = this.populationKeys.reduce((previousValue, currentValue) => {
            const key = currentValue.key;
            const idKey = currentValue.idKey;
            const objectIdKeyValue = one[idKey];

            if (!objectIdKeyValue) {
                return {
                    ...previousValue,
                    [key]: null
                };
            }

            if (!Array.isArray(objectIdKeyValue)) {
                const value = currentValue.model.findByIdPopulated(objectIdKeyValue);

                return {
                    ...previousValue,
                    [key]: value
                };
            }

            const values = objectIdKeyValue.map((x) => currentValue.model.findByIdPopulated(x));

            return {
                ...previousValue,
                [key]: values
            };
        }, {});

        return ({
            ...one,
            ...populatedKeys
        } as unknown) as Y;
    }

    public findByIdDeepPopulated(id: string): Z {
        const one = this.findById(id);

        if (!one) {
            throw 'NOT_FOUND_FOR_POPULATION';
        }

        const populatedKeys = this.populationKeys.reduce((previousValue, currentValue) => {
            const key = currentValue.key;
            const idKey = currentValue.idKey;
            const objectIdKeyValue = one[idKey];

            if (!objectIdKeyValue) {
                return {
                    ...previousValue,
                    [key]: null
                };
            }

            if (!Array.isArray(objectIdKeyValue)) {
                const value = currentValue.model.findByIdDeepPopulated(objectIdKeyValue);

                return {
                    ...previousValue,
                    [key]: value
                };
            }

            const values = objectIdKeyValue.map((x) => currentValue.model.findByIdDeepPopulated(x));

            return {
                ...previousValue,
                [key]: values
            };
        }, {});

        return ({
            ...one,
            ...populatedKeys
        } as unknown) as Z;
    }

    public updateById(id: string, data: Partial<X>): void {
        const path = [this.Ref, id].join('/');

        if (!this.database.db.exists(path)) {
            return;
        }

        return this.database.db.push(path, data, false);
    }

    public deleteById(id: string): void {
        if (!id || id === '') {
            throw 'EMPTY_STRING';
        }

        const path = [this.Ref, id].join('/');

        if (!this.database.db.exists(path)) {
            return;
        }

        return this.database.db.delete(path);
    }

    public createDbModel(unit: X) {
        const path = this.database.buildCollectionItemPath(this.Schema, unit.id);

        if (this.database.db.exists(path)) {
            throw `ALREADY_EXISTS: ${path}`;
        }

        this.database.db.push(path, unit, false);
    }
}
