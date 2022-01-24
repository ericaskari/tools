import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActionUnit, InterfaceUnit } from '@ngrx-fsm/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ConnectionService } from '../../../../services/connection.service';
import { actionUnitCrud, interfaceUnitCrud } from '../../../../store/crud-store-module';

@Component({
    selector: 'app-action-list-item',
    templateUrl: './action-list-item.component.html',
    styleUrls: ['./action-list-item.component.scss']
})
export class ActionListItemComponent implements OnInit, OnChanges {
    @Input() item: ActionUnit | null = null;

    @Output() createInstance: EventEmitter<ActionUnit> = new EventEmitter<ActionUnit>();

    interfaces$: Observable<InterfaceUnit[]> = this.store.select(interfaceUnitCrud.selector.listItems);

    public actionFG: FormGroup = this.InitializeActionFG();

    editMode = false;

    constructor(private store: Store, private fb: FormBuilder, public connectionService: ConnectionService) {}

    ngOnInit(): void {}

    private InitializeActionFG(): FormGroup {
        const formControls: Record<keyof ActionUnit, any[]> = {
            id: [''],
            name: [''],
            inputInterfaceId: []
        };
        return this.fb.group(formControls);
    }

    public onUpdateAction(): void {
        const actionUnit: ActionUnit = this.actionFG.value;

        this.store.dispatch(
            actionUnitCrud.actions.Update(actionUnit.id, {
                ...actionUnit,
                inputInterface: null
            })
        );

        this.editMode = false;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateActionFG(changes.item.currentValue);
    }

    private updateActionFG(actionSector: ActionUnit): void {
        const { id = '', name = '', inputInterfaceId = null } = actionSector;

        this.actionFG.setValue({ id, name, inputInterfaceId });
    }
}
