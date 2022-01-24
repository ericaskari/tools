import {
    ReducerSector,
    ActionUnitPopulated,
    ReducerSectorPopulated,
    ActionUnitInstancePopulated,
    ReducerSectorDeepPopulated,
    ActionUnit,
    ActionUnitDeepPopulated
} from '@ngrx-fsm/common';
import Ajv, { JTDSchemaType, ValidateFunction } from 'ajv/dist/jtd';
import { Service } from 'typedi';
import { v4 as uuid } from 'uuid';

import { DATABASE_SCHEMAS, DatabaseConfiguration } from '../configs/database.configuration';
import { ValidationConfiguration } from '../configs/validation.configuration';

import { GenericDatabaseModel } from './generic-database.model';
import { InterfaceUnitModel } from './interface-unit.model';

@Service()
export class ReducerUnitModel extends GenericDatabaseModel<ReducerSector, ReducerSectorPopulated, ReducerSectorDeepPopulated> {
    readonly Schema = DATABASE_SCHEMAS.reducerUnits;

    readonly Ref = this.database.buildCollectionPath(this.Schema);

    readonly serialize = this.validationConfiguration.ajv.compileSerializer(this.validationSchema);

    readonly parse = this.validationConfiguration.ajv.compileParser(this.validationSchema);

    readonly validate: ValidateFunction<ReducerSector> = this.validationConfiguration.ajv.compile(this.validationSchema);

    constructor(public database: DatabaseConfiguration, private validationConfiguration: ValidationConfiguration, private interfaceUnitModel: InterfaceUnitModel) {
        super();

        this.addPopulationKey('stateInterfaceId', 'stateInterface', interfaceUnitModel);
        this.addPopulationKey('actionInterfaceId', 'actionInterface', interfaceUnitModel);
    }

    private get validationSchema(): JTDSchemaType<ReducerSector> {
        return {
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                function: { type: 'string' },
                stateInterfaceId: { type: 'string', nullable: true },
                actionInterfaceId: { type: 'string', nullable: true }
            },
            optionalProperties: {}
        };
    }
}
