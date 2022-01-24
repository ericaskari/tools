import { Service } from 'typedi';

import { GenericCrudRoutes } from './generic-crud.routes';
import { ActionUnit, ActionUnitDeepPopulated, ActionUnitPopulated } from '@ngrx-fsm/common';
import {ActionUnitController} from "../controllers/action-unit.controller";

/****************************************
 *    Activities  /api/actions/
 ****************************************/
@Service()
export class ActionUnitRoutes extends GenericCrudRoutes<ActionUnit, ActionUnitPopulated, ActionUnitDeepPopulated> {
    constructor(public controller: ActionUnitController) {
        super(controller);
    }
}
