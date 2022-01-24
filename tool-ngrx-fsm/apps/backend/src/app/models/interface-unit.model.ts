import { InterfaceUnit, InterfaceUnitDeepPopulated, InterfaceUnitKey, InterfaceUnitKeyStatic, InterfaceUnitKeyTypes, InterfaceUnitPopulated } from '@ngrx-fsm/common';
import Ajv, { JTDSchemaType, ValidateFunction } from 'ajv/dist/jtd';
import { Service } from 'typedi';
import { v4 as uuid } from 'uuid';

import { DATABASE_SCHEMAS, DatabaseConfiguration } from '../configs/database.configuration';
import { ValidationConfiguration } from '../configs/validation.configuration';

import { GenericDatabaseModel } from './generic-database.model';

@Service()
export class InterfaceUnitModel extends GenericDatabaseModel<InterfaceUnit, InterfaceUnitPopulated, InterfaceUnitDeepPopulated> {
    readonly Schema = DATABASE_SCHEMAS.interfaces;

    readonly Ref = this.database.buildCollectionPath(this.Schema);

    readonly serialize = this.validationConfiguration.ajv.compileSerializer(this.validationSchema);

    readonly parse = this.validationConfiguration.ajv.compileParser(this.validationSchema);

    readonly validate: ValidateFunction<InterfaceUnit> = this.validationConfiguration.ajv.compile(this.validationSchema);

    constructor(public database: DatabaseConfiguration, private validationConfiguration: ValidationConfiguration) {
        super();
    }

    private get validationSchema(): JTDSchemaType<any> {
        return {};
    }
}
