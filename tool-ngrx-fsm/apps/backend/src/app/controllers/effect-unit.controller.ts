import { Service } from 'typedi';

import { EffectUnitModel } from '../models/effect-unit.model';
import {GenericCrudController} from "./generic-crud.controller";
import {EffectUnit, EffectUnitDeepPopulated, EffectUnitPopulated} from "@ngrx-fsm/common";

@Service()
export class EffectUnitController extends GenericCrudController<EffectUnit, EffectUnitPopulated, EffectUnitDeepPopulated> {
    constructor(public model: EffectUnitModel) {
        super(model);
    }
}

