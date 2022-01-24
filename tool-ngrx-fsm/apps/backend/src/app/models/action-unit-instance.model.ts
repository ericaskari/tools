import {
    ActionUnit,
    ActionUnitDeepPopulated,
    ActionUnitInstance,
    ActionUnitInstanceDeepPopulated,
    ActionUnitInstancePopulated,
    ActionUnitPopulated,
    InterfaceUnit,
    InterfaceUnitDeepPopulated,
    InterfaceUnitPopulated
} from '@ngrx-fsm/common';
import Ajv, { JTDSchemaType, ValidateFunction } from 'ajv/dist/jtd';
import { Service } from 'typedi';
import { v4 as uuid } from 'uuid';

import { DATABASE_SCHEMAS, DatabaseConfiguration } from '../configs/database.configuration';
import { ValidationConfiguration } from '../configs/validation.configuration';

import { ActionUnitModel } from './action-unit.model';
import { GenericDatabaseModel } from './generic-database.model';

@Service()
export class ActionUnitInstanceModel extends GenericDatabaseModel<ActionUnitInstance, ActionUnitInstancePopulated, ActionUnitInstanceDeepPopulated> {
    readonly Schema = DATABASE_SCHEMAS.actionUnitInstances;

    readonly Ref = this.database.buildCollectionPath(this.Schema);

    readonly serialize = this.validationConfiguration.ajv.compileSerializer(this.validationSchema);

    readonly parse = this.validationConfiguration.ajv.compileParser(this.validationSchema);

    readonly validate: ValidateFunction<ActionUnitInstance> = this.validationConfiguration.ajv.compile(this.validationSchema);

    constructor(public database: DatabaseConfiguration, private validationConfiguration: ValidationConfiguration, private actionUnitModel: ActionUnitModel) {
        super();
        this.addPopulationKey('actionUnitId', 'actionUnit', actionUnitModel);
    }

    private get validationSchema(): JTDSchemaType<ActionUnitInstance> {
        return {
            properties: {
                id: { type: 'string' },
                positionX: { type: 'int32' },
                positionY: { type: 'int32' },
                actionUnitId: { type: 'string', nullable: true }
            },
            optionalProperties: {}
        };
    }
}
