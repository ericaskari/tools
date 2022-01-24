import { TriggerUnit, TriggerUnitDeepPopulated, TriggerUnitPopulated } from '@ngrx-fsm/common';
import Ajv, { JTDSchemaType, ValidateFunction } from 'ajv/dist/jtd';
import { Service } from 'typedi';

import { DATABASE_SCHEMAS, DatabaseConfiguration } from '../configs/database.configuration';
import { ValidationConfiguration } from '../configs/validation.configuration';

import { ActionUnitModel } from './action-unit.model';
import { GenericDatabaseModel } from './generic-database.model';

@Service()
export class TriggerSectorModel extends GenericDatabaseModel<TriggerUnit, TriggerUnitPopulated, TriggerUnitDeepPopulated> {
    readonly Schema = DATABASE_SCHEMAS.triggerUnits;

    readonly Ref = this.database.buildCollectionPath(this.Schema);

    readonly serialize = this.validationConfiguration.ajv.compileSerializer(this.validationSchema);

    readonly parse = this.validationConfiguration.ajv.compileParser(this.validationSchema);

    readonly validate: ValidateFunction<TriggerUnit> = this.validationConfiguration.ajv.compile(this.validationSchema);

    constructor(public database: DatabaseConfiguration, private validationConfiguration: ValidationConfiguration, private actionUnitModel: ActionUnitModel) {
        super();

        this.addPopulationKey('callActionId', 'callAction', actionUnitModel);
    }

    private get validationSchema(): JTDSchemaType<TriggerUnit> {
        return {
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                callActionId: { type: 'string', nullable: true }
            },
            optionalProperties: {}
        };
    }
}
