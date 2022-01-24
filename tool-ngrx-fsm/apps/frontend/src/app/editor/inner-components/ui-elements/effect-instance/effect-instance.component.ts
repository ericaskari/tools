import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActionUnitInstance, EffectUnit, EffectUnitDeepPopulated } from '@ngrx-fsm/common';
import { Store } from '@ngrx/store';

import { ConnectionService } from '../../../../services/connection.service';
import { Position } from '../../../../services/size.service';
import { effectUnitCrud } from '../../../../store/crud-store-module';
import { Hanger } from '../../../view-components/layer-relations/line.service';

@Component({
    selector: 'app-effect-instance',
    templateUrl: './effect-instance.component.html',
    styleUrls: ['./effect-instance.component.scss']
})
export class EffectInstanceComponent implements OnInit {
    @Input() item: EffectUnitDeepPopulated | null = null;

    editMode = false;

    inputActionHangerRelativePosition = EffectInstanceComponent.getInputActionHangerRelativePosition();
    successOutputRelativePosition = EffectInstanceComponent.getSuccessOutputRelativePosition();
    failOutputRelativePosition = EffectInstanceComponent.getFailOutputRelativePosition();

    constructor(private store: Store, private fb: FormBuilder, public connectionService: ConnectionService) {}

    static getInputActionHangerRelativePosition(): Position {
        return {
            positionX: 0,
            positionY: 50
        };
    }

    static getInputActionHangerPosition(effectUnit: EffectUnit): Hanger {
        return {
            hangerPositionX: effectUnit.positionX + this.getInputActionHangerRelativePosition().positionX,
            hangerPositionY: effectUnit.positionY + this.getInputActionHangerRelativePosition().positionY
        };
    }

    static getSuccessOutputRelativePosition(): Position {
        return {
            positionX: 300, //width
            positionY: 50
        };
    }

    static getSuccessOutputPosition(effectUnit: EffectUnit): Hanger {
        return {
            ...this,
            hangerPositionX: effectUnit.positionX + this.getSuccessOutputRelativePosition().positionX,
            hangerPositionY: effectUnit.positionY + this.getSuccessOutputRelativePosition().positionY
        };
    }


    static getFailOutputRelativePosition(): Position {
        return {
            positionX: 300, //width
            positionY: 200
        };
    }

    static getFailOutputPosition(effectUnit: EffectUnit): Hanger {
        return {
            hangerPositionX: effectUnit.positionX + this.getFailOutputRelativePosition().positionX,
            hangerPositionY: effectUnit.positionY + this.getFailOutputRelativePosition().positionY
        };
    }

    ngOnInit(): void {}

    get disableDeleteButton(): boolean {
        if (!this.item) {
            return true;
        }

        return !!(this.item.inputActionId || this.item.failActionId || this.item.successActionId);
    }

    get positionX(): number {
        if (!this.item) return 0;

        return this.item.positionX;
    }

    get positionY(): number {
        if (!this.item) return 0;

        return this.item.positionY;
    }

    deleteEffectUnit() {
        if (!this.item) {
            return;
        }

        this.store.dispatch(effectUnitCrud.actions.Delete(this.item.id));

        setTimeout(() => {
            this.store.dispatch(effectUnitCrud.actions.Get());
        }, 100);
    }

}
