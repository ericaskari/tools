import {
    ActionUnit,
    ActionUnitDeepPopulated,
    ActionUnitInstance,
    ActionUnitInstanceDeepPopulated,
    EffectUnit,
    EffectUnitDeepPopulated,
    InterfaceConverterUnit,
    InterfaceConverterUnitDeepPopulated,
    InterfaceUnit,
    InterfaceUnitDeepPopulated,
    TriggerUnit,
    TriggerUnitDeepPopulated
} from '@ngrx-fsm/common';

import { CrudEndpointsEnum } from '../../enums/crud-endpoints.enum';

import { CrudAction } from './src/crud.action';
import { CrudSelectors } from './src/crud.selector';

export class CrudBuilder<T, NEW_T, STATE = Record<string, unknown>> {
    selector = new CrudSelectors<T, NEW_T>(this.endpoint);
    actions = new CrudAction<T, NEW_T>(this.endpoint);
    constructor(public endpoint: CrudEndpointsEnum) {}
}

export const interfaceUnitCrud = new CrudBuilder<InterfaceUnitDeepPopulated, InterfaceUnit>(CrudEndpointsEnum.interfaces);
export const interfaceUnitKeyCrud = new CrudBuilder<InterfaceUnitDeepPopulated, InterfaceUnit>(CrudEndpointsEnum.interfaceKeys);
export const interfaceConverterUnitCrud = new CrudBuilder<InterfaceConverterUnitDeepPopulated, InterfaceConverterUnit>(CrudEndpointsEnum.interfaceConverters);
export const triggerUnitCrud = new CrudBuilder<TriggerUnitDeepPopulated, TriggerUnit>(CrudEndpointsEnum.triggers);
export const actionUnitCrud = new CrudBuilder<ActionUnitDeepPopulated, ActionUnit>(CrudEndpointsEnum.actions);
export const actionUnitInstanceCrud = new CrudBuilder<ActionUnitInstanceDeepPopulated, ActionUnitInstance>(CrudEndpointsEnum.actionUnitInstances);
export const effectUnitCrud = new CrudBuilder<EffectUnitDeepPopulated, EffectUnit>(CrudEndpointsEnum.effects);
