import { Service } from 'typedi';

import { TriggerSectorController } from '../controllers/trigger-sector.controller';
import { GenericCrudRoutes } from './generic-crud.routes';
import { TriggerUnit, TriggerUnitDeepPopulated, TriggerUnitPopulated } from '@ngrx-fsm/common';

/****************************************
 *    Activities  /api/triggers/
 ****************************************/
@Service()
export class TriggerSectorRoutes extends GenericCrudRoutes<TriggerUnit, TriggerUnitPopulated, TriggerUnitDeepPopulated> {
    constructor(public controller: TriggerSectorController) {
        super(controller);
    }
}
