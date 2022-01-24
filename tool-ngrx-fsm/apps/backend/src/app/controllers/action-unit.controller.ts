import { ActionUnit, ActionUnitDeepPopulated, ActionUnitPopulated } from '@ngrx-fsm/common';
import { Service } from 'typedi';

import { ActionUnitModel } from '../models/action-unit.model';

import { GenericCrudController } from './generic-crud.controller';

@Service()
export class ActionUnitController extends GenericCrudController<ActionUnit, ActionUnitPopulated, ActionUnitDeepPopulated> {
    constructor(public model: ActionUnitModel) {
        super(model);
    }
}
