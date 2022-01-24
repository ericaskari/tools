import { ActionUnitInstance, ActionUnitInstanceDeepPopulated, ActionUnitInstancePopulated } from '@ngrx-fsm/common';
import { Service } from 'typedi';

import { ActionUnitInstanceController } from '../controllers/action-unit-instance.controller';

import { GenericCrudRoutes } from './generic-crud.routes';

/****************************************
 *    Activities  /api/actionUnitInstances/
 ****************************************/
@Service()
export class ActionUnitInstanceRoutes extends GenericCrudRoutes<ActionUnitInstance, ActionUnitInstancePopulated, ActionUnitInstanceDeepPopulated> {
    constructor(public controller: ActionUnitInstanceController) {
        super(controller);
    }
}
