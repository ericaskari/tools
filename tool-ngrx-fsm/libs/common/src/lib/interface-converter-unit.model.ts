import { InterfaceUnit, InterfaceUnitDeepPopulated } from './interface-unit.model';

export interface InterfaceConverterUnit {
    id: string;
    name: string;
    path: string;
    inputInterfaceId: string | null;
    outputInterfaceId: string | null;
}

export interface InterfaceConverterUnitPopulated extends InterfaceConverterUnit {
    inputInterface: InterfaceUnit | null;
    outputInterface: InterfaceUnit | null;
}

export interface InterfaceConverterUnitDeepPopulated extends InterfaceConverterUnit {
    inputInterface: InterfaceUnitDeepPopulated | null;
    outputInterface: InterfaceUnitDeepPopulated | null;
}
