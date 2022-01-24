import { Injectable } from '@angular/core';
import {ActionUnitInstance, EffectUnit, EffectUnitDeepPopulated} from '@ngrx-fsm/common';
import { Store } from '@ngrx/store';

import { effectUnitCrud } from '../store/crud-store-module';

@Injectable({
    providedIn: 'root'
})
export class ConnectionService {
    public selectedActionUnitInstanceOutput: ActionUnitInstance | null = null;

    public selectedEffectForSuccessOutput: EffectUnit | null = null;

    public selectedEffectForFailOutput: EffectUnit | null = null;

    constructor(private store: Store) {}

    actionUnitInstanceIsReadyToAttachOutput(actionUnitInstance: ActionUnitInstance) {
        this.selectedEffectForSuccessOutput = null;
        this.selectedEffectForFailOutput = null;

        if (!this.selectedActionUnitInstanceOutput) {
            this.selectedActionUnitInstanceOutput = actionUnitInstance;
            return;
        }

        if (this.selectedActionUnitInstanceOutput === actionUnitInstance) {
            this.selectedActionUnitInstanceOutput = null;
            return;
        }

        this.selectedActionUnitInstanceOutput = actionUnitInstance;
        return;
    }

    effectUnitWantsToAttachInput(item: EffectUnitDeepPopulated) {
        this.selectedEffectForSuccessOutput = null;
        this.selectedEffectForFailOutput = null;

        if (!this.selectedActionUnitInstanceOutput) {
            return;
        }

        this.store.dispatch(
            effectUnitCrud.actions.Update(item.id, {
                ...item,
                inputActionId: this.selectedActionUnitInstanceOutput.id,
                inputAction: null,
                failAction: null,
                successAction: null,
                reducerSector: null
            })
        );

        this.selectedActionUnitInstanceOutput = null;

        setTimeout(() => this.store.dispatch(effectUnitCrud.actions.Get()), 100);
    }

    effectUnitIsReadyToAttachSuccessOutput(effectUnit: EffectUnit) {
        this.selectedActionUnitInstanceOutput = null;
        this.selectedEffectForFailOutput = null;

        if (!this.selectedEffectForSuccessOutput) {
            this.selectedEffectForSuccessOutput = effectUnit;
            return;
        }

        if (this.selectedEffectForSuccessOutput === effectUnit) {
            this.selectedEffectForSuccessOutput = null;
            return;
        }

        this.selectedEffectForSuccessOutput = effectUnit;
        return;
    }

    actionUnitWantsToAttachSuccessOutput(item: ActionUnitInstance) {
        this.selectedActionUnitInstanceOutput = null;
        this.selectedEffectForFailOutput = null;

        if (!this.selectedEffectForSuccessOutput) {
            return;
        }

        this.store.dispatch(
            effectUnitCrud.actions.Update(this.selectedEffectForSuccessOutput.id, {
                ...this.selectedEffectForSuccessOutput,
                successActionId: item.id,
                inputAction: null,
                failAction: null,
                successAction: null,
                reducerSector: null
            })
        );

        this.selectedEffectForSuccessOutput = null;

        setTimeout(() => this.store.dispatch(effectUnitCrud.actions.Get()), 100);
    }

    effectUnitIsReadyToAttachFailedOutput(effectUnit: EffectUnit) {
        this.selectedActionUnitInstanceOutput = null;
        this.selectedEffectForSuccessOutput = null;

        if (!this.selectedEffectForFailOutput) {
            this.selectedEffectForFailOutput = effectUnit;
            return;
        }

        if (this.selectedEffectForFailOutput === effectUnit) {
            this.selectedEffectForFailOutput = null;
            return;
        }

        this.selectedEffectForFailOutput = effectUnit;
        return;
    }

    actionUnitWantsToAttachFailOutput(item: ActionUnitInstance) {
        this.selectedActionUnitInstanceOutput = null;
        this.selectedEffectForSuccessOutput = null;

        if (!this.selectedEffectForFailOutput) {
            return;
        }

        this.store.dispatch(
            effectUnitCrud.actions.Update(this.selectedEffectForFailOutput.id, {
                ...this.selectedEffectForFailOutput,
                failActionId: item.id,
                inputAction: null,
                failAction: null,
                successAction: null,
                reducerSector: null
            })
        );

        this.selectedEffectForSuccessOutput = null;

        setTimeout(() => this.store.dispatch(effectUnitCrud.actions.Get()), 100);
    }
}
