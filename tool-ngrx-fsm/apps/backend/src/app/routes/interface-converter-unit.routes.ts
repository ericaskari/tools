import { Service } from 'typedi';

import { InterfaceController } from '../controllers/interface.controller';
import { GenericCrudRoutes } from './generic-crud.routes';
import {InterfaceConverterUnit, InterfaceConverterUnitDeepPopulated, InterfaceConverterUnitPopulated, InterfaceUnit, InterfaceUnitDeepPopulated, InterfaceUnitPopulated} from '@ngrx-fsm/common';
import {InterfaceConverterUnitController} from "../controllers/interface-converter-unit.controller";

/****************************************
 *    Activities  /api/interfaceConverters/
 ****************************************/
@Service()
export class InterfaceConverterUnitRoutes extends GenericCrudRoutes<InterfaceConverterUnit, InterfaceConverterUnitPopulated, InterfaceConverterUnitDeepPopulated> {
    constructor(public controller: InterfaceConverterUnitController) {
        super(controller);
    }
}
