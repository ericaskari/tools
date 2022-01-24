import { Service } from 'typedi';
import { InterfaceUnitModel } from '../models/interface-unit.model';
import { GenericCrudController } from './generic-crud.controller';
import { InterfaceUnit, InterfaceUnitDeepPopulated, InterfaceUnitPopulated } from '@ngrx-fsm/common';

@Service()
export class InterfaceController extends GenericCrudController<InterfaceUnit, InterfaceUnitPopulated, InterfaceUnitDeepPopulated> {
    constructor(public model: InterfaceUnitModel) {
        super(model);
    }
}
