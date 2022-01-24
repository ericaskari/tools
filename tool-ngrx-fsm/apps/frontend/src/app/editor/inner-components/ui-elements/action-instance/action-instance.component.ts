import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActionUnitInstance, ActionUnitInstanceDeepPopulated, EffectUnit } from '@ngrx-fsm/common';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ConnectionService } from '../../../../services/connection.service';
import { Position, SizeService } from '../../../../services/size.service';
import { actionUnitInstanceCrud, effectUnitCrud } from '../../../../store/crud-store-module';
import { Hanger } from '../../../view-components/layer-relations/line.service';

@Component({
    selector: 'app-action-instance',
    templateUrl: './action-instance.component.html',
    styleUrls: ['./action-instance.component.scss']
})
export class ActionInstanceComponent {
    @HostBinding('style.width') width = this.sizeService.actionSectorStyle.width;
    @HostBinding('style.height') height = this.sizeService.actionSectorStyle.height;

    @Input() item: ActionUnitInstanceDeepPopulated | null = null;

    @Output() saveAction: EventEmitter<ActionUnitInstance> = new EventEmitter<ActionUnitInstance>();

    effectUnits$: Observable<EffectUnit[]> = this.store.select(effectUnitCrud.selector.listItems);

    outputRelativePosition = ActionInstanceComponent.getOutputRelativePosition();
    inputRelativePosition = ActionInstanceComponent.getInputRelativePosition();

     constructor(
        private store: Store,
        private fb: FormBuilder,
        public connectionService: ConnectionService,
        private sizeService: SizeService
    ) {}

    static getOutputRelativePosition(): Position {
        return {
            positionX: 400,
            positionY: 50
        };
    }

    static getOutputPosition(actionUnit: ActionUnitInstance): Hanger {
        return {
            hangerPositionX: actionUnit.positionX + this.getOutputRelativePosition().positionX,
            hangerPositionY: actionUnit.positionY + this.getOutputRelativePosition().positionY
        };
    }

    static getInputRelativePosition(): Position {
        return {
            positionX: 0,
            positionY: 50
        };
    }

    static getInputPosition(actionUnit: ActionUnitInstance): Hanger {
        return {
            hangerPositionX: actionUnit.positionX + this.getInputRelativePosition().positionX,
            hangerPositionY: actionUnit.positionY + this.getInputRelativePosition().positionY
        };
    }

    get disableInputInterfaceHanger(): boolean {
        return !this.item;
    }

    get positionX(): number {
        if (!this.item) return 0;

        return this.item.positionX;
    }

    get positionY(): number {
        if (!this.item) return 0;

        return this.item.positionY;
    }

    effectInputClicked() {
        if (!this.item) {
            return;
        }

        if (this.connectionService.selectedEffectForSuccessOutput) {
            this.connectionService.actionUnitWantsToAttachSuccessOutput(this.item);
            return;
        }

        if (this.connectionService.selectedEffectForFailOutput) {
            this.connectionService.actionUnitWantsToAttachFailOutput(this.item);
            return;
        }
    }

    // comment
    get name(): string {
        if (!this.item) {
            return '-';
        }

        if (!this.item.actionUnit) {
            return `${this.item.actionUnitId}`;
        }

        return this.item.actionUnit.name;
    }

    public get disableDeleteButton$(): Observable<boolean> {
        return this.effectUnits$.pipe(
            map((effectUnits: EffectUnit[]): boolean => {
                return !!effectUnits.find((x: EffectUnit) => {
                    if (!this.item) {
                        return true;
                    }

                    const id = this.item.id;
                    return x.failActionId === id || x.inputActionId === id || x.successActionId === id;
                });
            })
        );
    }

    public deleteActionUnitInstance() {
        if (!this.item) {
            return;
        }

        this.store.dispatch(actionUnitInstanceCrud.actions.Delete(this.item.id));

        setTimeout(() => {
            this.store.dispatch(actionUnitInstanceCrud.actions.Get());
        }, 100);
    }
}
