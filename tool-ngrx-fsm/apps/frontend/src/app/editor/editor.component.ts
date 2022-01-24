import { Component, OnInit } from '@angular/core';
import { ActionUnit, EffectUnit, InterfaceConverterUnit, InterfaceUnit } from '@ngrx-fsm/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
    actionUnitCrud,
    actionUnitInstanceCrud,
    effectUnitCrud,
    interfaceConverterUnitCrud,
    interfaceUnitCrud
} from '../store/crud-store-module';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    interfaces$: Observable<InterfaceUnit[]> = this.store.select(interfaceUnitCrud.selector.listItems);
    interfaceConverters$: Observable<InterfaceConverterUnit[]> = this.store.select(
        interfaceConverterUnitCrud.selector.listItems
    );
    actions$: Observable<ActionUnit[]> = this.store.select(actionUnitCrud.selector.listItems);
    effects$: Observable<EffectUnit[]> = this.store.select(effectUnitCrud.selector.listItems);

    constructor(private store: Store) {}

    ngOnInit(): void {}

    createActionUnitInstance(item: ActionUnit) {
        this.store.dispatch(
            actionUnitInstanceCrud.actions.Create({
                id: '',
                positionY: 0,
                positionX: 0,
                actionUnitId: item.id
            })
        );

        this.store.dispatch(actionUnitInstanceCrud.actions.Get());
    }
    createActionUnit() {
        this.store.dispatch(
            actionUnitCrud.actions.Create({
                id: '',
                name: 'UnNamed Action',
                inputInterfaceId: null
            })
        );

        this.store.dispatch(actionUnitCrud.actions.Get());
    }

    createEffectUnit() {
        this.store.dispatch(
            effectUnitCrud.actions.Create({
                id: '',
                name: 'UnNamed Effect',
                url: '',
                reducerSectorId: null,
                successActionId: null,
                failActionId: null,
                inputActionId: null,
                positionX: 0,
                positionY: 0
            })
        );

        this.store.dispatch(effectUnitCrud.actions.Get());
    }
    createInterfaceUnit() {
        // this.store.dispatch(
        //     interfaceUnitCrud.actions.Create({
        //         id: '',
        //         name: 'UnNamed Effect'
        //     })
        // );

        this.store.dispatch(interfaceUnitCrud.actions.Get());
    }
    createInterfaceConverterUnit() {
        this.store.dispatch(
            interfaceConverterUnitCrud.actions.Create({
                id: '',
                name: 'UnNamed Interface Converter',
                path: '',
                inputInterfaceId: null,
                outputInterfaceId: null
            })
        );

        this.store.dispatch(interfaceUnitCrud.actions.Get());
    }

    trackByInterfaceUnitListItem(index: number, item: InterfaceUnit) {
        return `${index} ${item.name}${item.id}`;
    }

    trackByActionUnitListItem(index: number, item: ActionUnit) {
        return `${index} ${item.name}${item.id} ${item.inputInterfaceId}`;
    }

    trackByEffectUnitListItem(index: number, item: EffectUnit) {
        return `${index} ${item.name}${item.id} ${item.inputActionId} ${item.successActionId} ${item.failActionId} ${item.reducerSectorId} ${item.url}`;
    }

    trackByInterfaceConverterUnitListItem(index: number, item: InterfaceConverterUnit) {
        return `${index} ${item.name}${item.id} ${item.path} ${item.inputInterfaceId} ${item.outputInterfaceId}`;
    }

    dragOverlayMouseEnter(e: MouseEvent) {
        console.log('dragOverlayMouseEnter :', e);
    }

    dragOverlayMouseLeave(e: MouseEvent) {
        console.log('dragOverlayMouseLeave :', e);
    }

    dragOverlayMouseScroll(e: Event) {
        console.log('dragOverlayMouseScroll :', e);
    }
}
