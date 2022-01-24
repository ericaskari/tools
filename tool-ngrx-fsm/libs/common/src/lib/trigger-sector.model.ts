import { ActionUnit, ActionUnitDeepPopulated } from './action-unit.model';

export interface TriggerUnit {
    id: string;
    name: string;
    callActionId: string | null;
}

export interface TriggerUnitPopulated extends TriggerUnit {
    callAction: ActionUnit | null;
}

export interface TriggerUnitDeepPopulated extends TriggerUnit {
    callAction: ActionUnitDeepPopulated | null;
}
