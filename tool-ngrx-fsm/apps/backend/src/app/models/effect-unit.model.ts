import { EffectUnit, EffectUnitDeepPopulated, EffectUnitPopulated } from '@ngrx-fsm/common';
import { JTDSchemaType, ValidateFunction } from 'ajv/dist/jtd';
import { Service } from 'typedi';

import { DATABASE_SCHEMAS, DatabaseConfiguration } from '../configs/database.configuration';
import { ValidationConfiguration } from '../configs/validation.configuration';

import { ActionUnitInstanceModel } from './action-unit-instance.model';
import { GenericDatabaseModel } from './generic-database.model';
import { ReducerUnitModel } from './reducer-unit.model';

@Service()
export class EffectUnitModel extends GenericDatabaseModel<EffectUnit, EffectUnitPopulated, EffectUnitDeepPopulated> {
    readonly Schema = DATABASE_SCHEMAS.effectUnits;

    readonly Ref = this.database.buildCollectionPath(this.Schema);

    readonly serialize = this.validationConfiguration.ajv.compileSerializer(this.validationSchema);

    readonly parse = this.validationConfiguration.ajv.compileParser(this.validationSchema);

    readonly validate: ValidateFunction<EffectUnit> = this.validationConfiguration.ajv.compile(this.validationSchema);

    constructor(
        public database: DatabaseConfiguration,
        private validationConfiguration: ValidationConfiguration,
        private actionUnitInstanceModel: ActionUnitInstanceModel,
        private reducerUnitModel: ReducerUnitModel
    ) {
        super();

        this.addPopulationKey('reducerSectorId', 'reducerSector', reducerUnitModel);
        this.addPopulationKey('inputActionId', 'inputAction', actionUnitInstanceModel);
        this.addPopulationKey('successActionId', 'successAction', actionUnitInstanceModel);
        this.addPopulationKey('failActionId', 'failAction', actionUnitInstanceModel);
    }

    private get validationSchema(): JTDSchemaType<EffectUnit> {
        return {
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                url: { type: 'string' },
                positionX: { type: 'int32' },
                positionY: { type: 'int32' },
                reducerSectorId: { type: 'string', nullable: true },
                inputActionId: { type: 'string', nullable: true },
                successActionId: { type: 'string', nullable: true },
                failActionId: { type: 'string', nullable: true }
            },
            optionalProperties: {}
        };
    }
}
