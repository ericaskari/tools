import { Service } from 'typedi';
import { GenericCrudController } from './generic-crud.controller';
import { InterfaceConverterUnit, InterfaceConverterUnitDeepPopulated, InterfaceConverterUnitPopulated } from '@ngrx-fsm/common';
import { InterfaceConverterUnitModel } from '../models/interface-converter-unit.model';

@Service()
export class InterfaceConverterUnitController extends GenericCrudController<InterfaceConverterUnit, InterfaceConverterUnitPopulated, InterfaceConverterUnitDeepPopulated> {
    constructor(public model: InterfaceConverterUnitModel) {
        super(model);
    }
}
