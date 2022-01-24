import { ReducerSector, ReducerSectorDeepPopulated } from './reducer-sector.model';
import { ActionUnitInstance, ActionUnitInstanceDeepPopulated } from './action-instance-unit.model';

export interface EffectUnit {
    id: string;
    name: string;
    url: string;
    reducerSectorId: string | null;
    inputActionId: string | null;
    successActionId: string | null;
    failActionId: string | null;
    positionX: number;
    positionY: number;
}

export interface EffectUnitPopulated extends EffectUnit {
    reducerSector: ReducerSector | null;
    inputAction: ActionUnitInstance | null;
    successAction: ActionUnitInstance | null;
    failAction: ActionUnitInstance | null;
}

export interface EffectUnitDeepPopulated extends EffectUnit {
    reducerSector: ReducerSectorDeepPopulated | null;
    inputAction: ActionUnitInstanceDeepPopulated | null;
    successAction: ActionUnitInstanceDeepPopulated | null;
    failAction: ActionUnitInstanceDeepPopulated | null;
}

export interface EffectUnitInputActionPopulated extends EffectUnit {
    inputAction: ActionUnitInstance | null;
}

export interface EffectUnitSuccessActionPopulated extends EffectUnit {
    successAction: ActionUnitInstance | null;
}

export interface EffectUnitFailActionPopulated extends EffectUnit {
    failAction: ActionUnitInstance | null;
}
