import { CdkDragMove } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostBinding, HostListener, Inject, OnInit } from '@angular/core';
import { ActionUnitInstance, ActionUnitInstanceDeepPopulated, EffectUnit, EffectUnitDeepPopulated, InterfaceUnit, SectorTypeEnum, SectorTypes } from '@ngrx-fsm/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SizeService } from '../../../services/size.service';
import { actionUnitCrud, actionUnitInstanceCrud, effectUnitCrud, interfaceConverterUnitCrud, interfaceUnitCrud } from '../../../store/crud-store-module';

@Component({
    selector: 'app-layer-drag',
    templateUrl: './layer-drag.component.html',
    styleUrls: ['./layer-drag.component.scss']
})
export class LayerDragComponent implements OnInit {
    @HostBinding('style.width') width = `${this.sizeService.DASHBOARD_WIDTH - this.sizeService.DASHBOARD_SNAPPINESS}px`;
    @HostBinding('style.height') height = `${this.sizeService.DASHBOARD_HEIGHT - this.sizeService.DASHBOARD_SNAPPINESS}px`;

    actionUnitInstances$: Observable<ActionUnitInstanceDeepPopulated[]> = this.store.select(actionUnitInstanceCrud.selector.listItems);

    effectSectors$: Observable<EffectUnitDeepPopulated[]> = this.store.select(effectUnitCrud.selector.listItems);

    constructor(private store: Store, private sizeService: SizeService, public componentRef: ElementRef, @Inject(DOCUMENT) private document: Document) {}

    ngOnInit(): void {
        this.store.dispatch(interfaceUnitCrud.actions.Get());
        this.store.dispatch(actionUnitCrud.actions.Get());
        this.store.dispatch(effectUnitCrud.actions.Get());
        this.store.dispatch(actionUnitInstanceCrud.actions.Get());
        this.store.dispatch(interfaceConverterUnitCrud.actions.Get());
    }

    onUpdateActionUnitInstance(actionUnitInstance: ActionUnitInstance): void {
        this.store.dispatch(
            actionUnitInstanceCrud.actions.Update(actionUnitInstance.id, {
                ...actionUnitInstance,
                actionUnit: null
            })
        );
    }

    onUpdateInterface(interfaceEl: InterfaceUnit): void {
        // this.store.dispatch(interfaceUnitCrud.actions.Update(interfaceEl.id, interfaceEl));
    }

    cdkDragMoved($event: CdkDragMove, instance: SectorTypes, type: SectorTypeEnum) {
        const snappiness = this.sizeService.DASHBOARD_SNAPPINESS;

        if (!this.componentRef) {
            return;
        }

        const rect = this.componentRef.nativeElement.getBoundingClientRect();

        const scrollLeft = window.pageXOffset || this.document.documentElement.scrollLeft;

        const scrollTop = window.pageYOffset || this.document.documentElement.scrollTop;

        //  Container top left position based on window
        const containerX: number = rect.left + scrollLeft;
        const containerY: number = rect.top + scrollTop;

        //  Container width and height
        const containerWidth: number = (this.componentRef.nativeElement as HTMLDivElement).offsetWidth;
        const containerHeight: number = (this.componentRef.nativeElement as HTMLDivElement).offsetHeight;

        //  Component size to protect it for getting out
        const componentWidth: number = $event.source.element.nativeElement.clientWidth;
        const componentHeight: number = $event.source.element.nativeElement.clientHeight;

        //  Component size in half
        const componentWidthInHalf: number = componentWidth / 2;
        const componentHeightInHalf: number = componentHeight / 2;

        //  Max allowed pointerX
        const pointerRelativeXMax: number = containerWidth - componentWidth;
        const pointerRelativeYMax: number = containerHeight - componentHeight;

        //  Max and Min allowed pointerX
        const pointerRelativeXFilter: (x: number) => number = (x: number) => (x > pointerRelativeXMax ? pointerRelativeXMax : x < 0 ? 0 : x);
        const pointerRelativeYFilter: (y: number) => number = (y: number) => (y > pointerRelativeYMax ? pointerRelativeYMax : y < 0 ? 0 : y);

        //  Mouse X and Y based on Window
        const pointerX: number = ($event.event as MouseEvent).clientX;
        const pointerY: number = ($event.event as MouseEvent).clientY;

        //  Mouse X and Y based on Container
        const pointerRelativeX: number = pointerX - containerX - componentWidthInHalf;
        const pointerRelativeY: number = pointerY - containerY - componentHeightInHalf;

        const pointerRelativeXFiltered: number = pointerRelativeXFilter(pointerRelativeX);
        const pointerRelativeYFiltered: number = pointerRelativeYFilter(pointerRelativeY);

        const roundedX: number = Math.floor(pointerRelativeXFiltered / snappiness) * snappiness;
        const roundedY: number = Math.floor(pointerRelativeYFiltered / snappiness) * snappiness;

        $event.source._dragRef.setFreeDragPosition({ x: roundedX, y: roundedY });

        if (!instance) {
            return;
        }

        if (type === SectorTypeEnum.ACTION_INSTANCE) {
            const action = instance as ActionUnitInstanceDeepPopulated;
            this.store.dispatch(
                actionUnitInstanceCrud.actions.Update(action.id, {
                    ...action,
                    positionX: roundedX,
                    positionY: roundedY
                })
            );
        }

        if (type === SectorTypeEnum.EFFECT) {
            const effect = instance as EffectUnitDeepPopulated;
            this.store.dispatch(
                effectUnitCrud.actions.Update(effect.id, {
                    ...effect,
                    positionX: roundedX,
                    positionY: roundedY
                })
            );
        }
    }

    trackByEffectSector(index: number, item: EffectUnitDeepPopulated) {
        return `${index} ${item.url} ${item.name} ${item.inputActionId} ${item.successActionId} ${item.failActionId}`;
    }

    trackByActionUnitInstance(index: number, item: ActionUnitInstance) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { positionX, positionY, ...rest } = item;
        return `${item.actionUnitId} ${index} ${item.id}`;
    }

    offset(el: { getBoundingClientRect: () => any }) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || this.document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || this.document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }
}
