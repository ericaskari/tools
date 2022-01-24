import { Service } from 'typedi';

import { EffectUnitController } from '../controllers/effect-unit.controller';
import {GenericCrudRoutes} from "./generic-crud.routes";
import {EffectUnit, EffectUnitDeepPopulated, EffectUnitPopulated} from "@ngrx-fsm/common";

/****************************************
 *    Activities  /api/effects/
 ****************************************/
@Service()
export class EffectUnitRoutes extends GenericCrudRoutes<EffectUnit, EffectUnitPopulated, EffectUnitDeepPopulated> {
    constructor(public controller: EffectUnitController) {
        super(controller);
    }
}

