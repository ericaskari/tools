import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { Service } from 'typedi';

export enum DATABASE_SCHEMAS {
    triggerUnits = 'triggerUnits',
    interfaces = 'interfaces',
    interfaceKeys = 'interfaceKeys',
    interfaceConverterUnits = 'interfaceConverterUnits',
    actionUnits = 'actionUnits',
    actionUnitInstances = 'actionUnitInstances',
    effectUnits = 'effectUnits',
    reducerUnits = 'reducerUnits'
}

@Service()
export class DatabaseConfiguration {
    db = new JsonDB(new Config('myDataBase', true, true, '/'));

    VERSION = 'v1';

    constructor() {}

    init(): void {
        this.db.push(this.buildCollectionPath(DATABASE_SCHEMAS.triggerUnits), {}, false);
        this.db.push(this.buildCollectionPath(DATABASE_SCHEMAS.interfaces), {}, false);
        this.db.push(this.buildCollectionPath(DATABASE_SCHEMAS.interfaceKeys), {}, false);
        this.db.push(this.buildCollectionPath(DATABASE_SCHEMAS.actionUnits), {}, false);
        this.db.push(this.buildCollectionPath(DATABASE_SCHEMAS.actionUnitInstances), {}, false);
        this.db.push(this.buildCollectionPath(DATABASE_SCHEMAS.effectUnits), {}, false);
        this.db.push(this.buildCollectionPath(DATABASE_SCHEMAS.reducerUnits), {}, false);
        this.db.push(this.buildCollectionPath(DATABASE_SCHEMAS.interfaceConverterUnits), {}, false);
    }

    public buildCollectionPath(schema: DATABASE_SCHEMAS): string {
        return `/${this.VERSION}/collections/${schema}`;
    }

    public buildCollectionItemPath(schema: DATABASE_SCHEMAS, id: string): string {
        return `${this.buildCollectionPath(schema)}/${id}`;
    }
}
