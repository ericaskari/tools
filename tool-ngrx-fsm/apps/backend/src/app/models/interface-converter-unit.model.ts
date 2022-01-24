import { InterfaceConverterUnit, InterfaceConverterUnitDeepPopulated, InterfaceConverterUnitPopulated } from '@ngrx-fsm/common';
import { JTDSchemaType, ValidateFunction } from 'ajv/dist/jtd';
import { Service } from 'typedi';

import { DATABASE_SCHEMAS, DatabaseConfiguration } from '../configs/database.configuration';
import { ValidationConfiguration } from '../configs/validation.configuration';

import { GenericDatabaseModel } from './generic-database.model';
import { InterfaceUnitModel } from './interface-unit.model';

@Service()
export class InterfaceConverterUnitModel extends GenericDatabaseModel<InterfaceConverterUnit, InterfaceConverterUnitPopulated, InterfaceConverterUnitDeepPopulated> {
    readonly Schema = DATABASE_SCHEMAS.interfaceConverterUnits;

    readonly Ref = this.database.buildCollectionPath(this.Schema);

    readonly serialize = this.validationConfiguration.ajv.compileSerializer(this.validationSchema);

    readonly parse = this.validationConfiguration.ajv.compileParser(this.validationSchema);

    readonly validate: ValidateFunction<InterfaceConverterUnit> = this.validationConfiguration.ajv.compile(this.validationSchema);

    constructor(public database: DatabaseConfiguration, private validationConfiguration: ValidationConfiguration, private interfaceUnitModel: InterfaceUnitModel) {
        super();

        this.addPopulationKey('inputInterfaceId', 'inputInterface', interfaceUnitModel);
        this.addPopulationKey('outputInterfaceId', 'outputInterface', interfaceUnitModel);
    }

    private get validationSchema(): JTDSchemaType<InterfaceConverterUnit> {
        return {
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                path: { type: 'string' },
                inputInterfaceId: { type: 'string', nullable: true },
                outputInterfaceId: { type: 'string', nullable: true }
            },
            optionalProperties: {}
        };
    }
}
