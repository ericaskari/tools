import { InterfaceUnit, InterfaceUnitDeepPopulated } from './interface-unit.model';

export interface ActionUnit {
    id: string;
    name: string;
    inputInterfaceId: string | null;
}

export interface ActionUnitPopulated extends ActionUnit {
    inputInterface: InterfaceUnit | null;
}

export interface ActionUnitDeepPopulated extends ActionUnit {
    inputInterface: InterfaceUnitDeepPopulated | null;
}
