import { Service } from 'typedi';

import { InterfaceController } from '../controllers/interface.controller';
import { GenericCrudRoutes } from './generic-crud.routes';
import { InterfaceUnit, InterfaceUnitDeepPopulated, InterfaceUnitPopulated } from '@ngrx-fsm/common';

/****************************************
 *    Activities  /api/interfaces/
 ****************************************/
@Service()
export class InterfaceRoutes extends GenericCrudRoutes<InterfaceUnit, InterfaceUnitPopulated, InterfaceUnitDeepPopulated> {
    constructor(public controller: InterfaceController) {
        super(controller);
    }
}
