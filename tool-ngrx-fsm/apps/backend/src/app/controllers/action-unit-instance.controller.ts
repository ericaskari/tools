import { ActionUnitInstance, ActionUnitInstanceDeepPopulated, ActionUnitInstancePopulated } from '@ngrx-fsm/common';
import { Service } from 'typedi';

import { ActionUnitInstanceModel } from '../models/action-unit-instance.model';

import { GenericCrudController } from './generic-crud.controller';

@Service()
export class ActionUnitInstanceController extends GenericCrudController<ActionUnitInstance, ActionUnitInstancePopulated, ActionUnitInstanceDeepPopulated> {
    constructor(public model: ActionUnitInstanceModel) {
        super(model);
    }
}
