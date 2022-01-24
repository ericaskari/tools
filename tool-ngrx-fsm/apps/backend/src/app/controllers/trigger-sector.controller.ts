import { Service } from 'typedi';

import { TriggerSectorModel } from '../models/trigger-sector.model';
import { GenericCrudController } from './generic-crud.controller';
import { TriggerUnit, TriggerUnitDeepPopulated, TriggerUnitPopulated } from '@ngrx-fsm/common';

@Service()
export class TriggerSectorController extends GenericCrudController<TriggerUnit, TriggerUnitPopulated, TriggerUnitDeepPopulated> {
    constructor(public model: TriggerSectorModel) {
        super(model);
    }
}
