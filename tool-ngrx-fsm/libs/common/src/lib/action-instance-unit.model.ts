import {ActionUnit, ActionUnitDeepPopulated} from "@ngrx-fsm/common";

export interface ActionUnitInstance {
    id: string;
    actionUnitId: string | null;
    positionX: number;
    positionY: number;
}

export interface ActionUnitInstancePopulated extends ActionUnitInstance {
    actionUnit: ActionUnit | null;
}

export interface ActionUnitInstanceDeepPopulated extends ActionUnitInstance {
    actionUnit: ActionUnitDeepPopulated | null;
}
