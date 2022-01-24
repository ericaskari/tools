import { InterfaceUnit } from './interface-unit.model';
import { EffectUnit } from './effect-sector.model';
import { ReducerSector } from './reducer-sector.model';
import { ActionUnitInstance } from './action-instance-unit.model';

export enum SectorTypeEnum {
    INTERFACE,
    ACTION_INSTANCE,
    REDUCER,
    EFFECT,
    INTERFACE_INSTANCE
}
export type SectorTypes = EffectUnit | ReducerSector | ActionUnitInstance | InterfaceUnit | null;
