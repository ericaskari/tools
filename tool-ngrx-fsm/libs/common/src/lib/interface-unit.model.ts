export enum InterfaceUnitKeyTypes {
    String = 'String',
    Number = 'Number',
    Boolean = 'Boolean',
    Interface = 'Interface',
    Object = 'Object',
    Enum = 'Enum',
    Null = 'Null',
    Union = 'Union'
}

export type Statics = InterfaceUnitKeyTypes.String | InterfaceUnitKeyTypes.Boolean | InterfaceUnitKeyTypes.Null | InterfaceUnitKeyTypes.Number;

export interface InterfaceUnitKeyStatic {
    type: Statics;
    value: string;
}

export interface InterfaceUnitKeyDynamic {
    type: InterfaceUnitKeyTypes.Object;
    value: InterfaceUnitKey;
}

export interface InterfaceUnitKeyImport {
    type: InterfaceUnitKeyTypes.Interface;
    value: string;
}

export interface InterfaceUnitKey {
    name: string;
    value: InterfaceUnitKeyStatic | InterfaceUnitKeyDynamic | InterfaceUnitKeyImport;
}

export interface InterfaceUnit {
    id: string;
    name: string;
    keys: InterfaceUnitKey[];
}

export interface InterfaceUnitPopulated extends InterfaceUnit {}

export interface InterfaceUnitDeepPopulated extends InterfaceUnit {}
