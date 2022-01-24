import { InterfaceUnit, InterfaceUnitDeepPopulated } from './interface-unit.model';

export interface ReducerSector {
    id: string;
    name: string;
    function: string;
    stateInterfaceId: string | null;
    actionInterfaceId: string | null;
}

export interface ReducerSectorPopulated extends ReducerSector {
    stateInterface: InterfaceUnit | null;
    actionInterface: InterfaceUnit | null;
}

export interface ReducerSectorDeepPopulated extends ReducerSector {
    stateInterface: InterfaceUnitDeepPopulated | null;
    actionInterface: InterfaceUnitDeepPopulated | null;
}
