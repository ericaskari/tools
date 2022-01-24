import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActionUnit, EffectUnit } from '@ngrx-fsm/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ConnectionService } from '../../../../services/connection.service';
import { actionUnitCrud, effectUnitCrud } from '../../../../store/crud-store-module';

@Component({
    selector: 'app-effect-list-item',
    templateUrl: './effect-list-item.component.html',
    styleUrls: ['./effect-list-item.component.scss']
})
export class EffectListItemComponent implements OnInit, OnChanges {
    @Input() item: EffectUnit | null = null;

    actionSectors$: Observable<ActionUnit[]> = this.store.select(actionUnitCrud.selector.listItems);

    editMode = false;

    public effectFG: FormGroup = this.InitializeEffectFG();

    constructor(private store: Store, private fb: FormBuilder, public connectionService: ConnectionService) {}

    private InitializeEffectFG(): FormGroup {
        return this.fb.group({
            id: [''],
            name: [''],
            url: [''],
            inputActionId: [null],
            successActionId: [null],
            failActionId: [null]
        });
    }

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        this.updateEffectFG(changes.item.currentValue);
    }

    private updateEffectFG(effectSector: EffectUnit): void {
        const { id = '', name = '', url = '', inputActionId = null, successActionId = null, failActionId = null } = effectSector;
        this.effectFG.setValue({ id, name, url, inputActionId, successActionId, failActionId });
    }

    public onUpdateEffect() {
        const value: EffectUnit = this.effectFG.value;

        this.store.dispatch(
            effectUnitCrud.actions.Update(value.id, {
                ...value,
                inputAction: null,
                failAction: null,
                successAction: null,
                reducerSector: null
            })
        );

        this.editMode = false;
    }
}
