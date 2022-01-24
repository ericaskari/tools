import { ActionUnit, ActionUnitDeepPopulated, ActionUnitInstancePopulated, ActionUnitPopulated, EffectUnitDeepPopulated, InterfaceUnit } from '@ngrx-fsm/common';
import Ajv, { JTDSchemaType, ValidateFunction } from 'ajv/dist/jtd';
import { Service } from 'typedi';
import { v4 as uuid } from 'uuid';

import { DATABASE_SCHEMAS, DatabaseConfiguration } from '../configs/database.configuration';
import { ValidationConfiguration } from '../configs/validation.configuration';

import { GenericDatabaseModel } from './generic-database.model';
import { InterfaceUnitModel } from './interface-unit.model';

@Service()
export class ActionUnitModel extends GenericDatabaseModel<ActionUnit, ActionUnitPopulated, ActionUnitDeepPopulated> {
    readonly Schema = DATABASE_SCHEMAS.actionUnits;

    readonly Ref = this.database.buildCollectionPath(this.Schema);

    readonly serialize = this.validationConfiguration.ajv.compileSerializer(this.validationSchema);

    readonly parse = this.validationConfiguration.ajv.compileParser(this.validationSchema);

    readonly validate: ValidateFunction<ActionUnit> = this.validationConfiguration.ajv.compile(this.validationSchema);

    constructor(public database: DatabaseConfiguration, private validationConfiguration: ValidationConfiguration, private interfaceUnitModel: InterfaceUnitModel) {
        super();
        this.addPopulationKey('inputInterfaceId', 'inputInterface', interfaceUnitModel);
    }

    private get validationSchema(): JTDSchemaType<ActionUnit> {
        return {
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                inputInterfaceId: { type: 'string', nullable: true }
            },
            optionalProperties: {}
        };
    }
}
