import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActionUnit, EffectUnit } from '@ngrx-fsm/common';
import { actionUnitInstanceCrud, effectUnitCrud } from '../../../../store/crud-store-module';
import { Store } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';
import { ConnectionService } from '../../../../services/connection.service';
import { SizeService } from '../../../../services/size.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-interface-converter-instance',
    templateUrl: './interface-converter-instance.component.html',
    styleUrls: ['./interface-converter-instance.component.scss']
})
export class InterfaceConverterInstanceComponent {
    // @HostBinding('style.width') width = this.sizeService.actionSectorStyle.width;
    // @HostBinding('style.height') height = this.sizeService.actionSectorStyle.height;
    // @Input() actionSector: ActionUnit | null = null;
    // @Output() saveAction: EventEmitter<ActionUnitInstanceUiModel> = new EventEmitter<ActionUnitInstanceUiModel>();
    // effectUnits$: Observable<EffectUnit[]> = this.store.select(effectUnitCrud.selector.listItems);
    //
    // constructor(
    //     private store: Store,
    //     private fb: FormBuilder,
    //     public connectionService: ConnectionService,
    //     private sizeService: SizeService,
    //     private populatedService: PopulatedService
    // ) {}
    //
    // get disableInputInterfaceHanger(): boolean {
    //     return !this.actionSector;
    // }
    //
    // effectInputClicked() {
    //     if (!this.actionSector) {
    //         return;
    //     }
    //
    //     if (this.connectionService.selectedEffectForSuccessOutput) {
    //         this.connectionService.actionUnitWantsToAttachSuccessOutput(this.actionSector);
    //         return;
    //     }
    //
    //     if (this.connectionService.selectedEffectForFailOutput) {
    //         this.connectionService.actionUnitWantsToAttachFailOutput(this.actionSector);
    //         return;
    //     }
    // }
    //
    // get name$(): Observable<string> {
    //     if (!this.actionSector) {
    //         return of('-');
    //     }
    //
    //     return this.populatedService.getPopulatedActionInstance$(this.actionSector).pipe(
    //         map((populated): string => {
    //             if (!this.actionSector) {
    //                 return '-';
    //             }
    //
    //             if (!populated || !populated.actionUnit) {
    //                 return `${this.actionSector.actionUnitId}`;
    //             }
    //
    //             return populated.actionUnit.name;
    //         })
    //     );
    // }
    //
    // public get disableDeleteButton$(): Observable<boolean> {
    //     return this.effectUnits$.pipe(
    //         map((effectUnits: EffectUnit[]): boolean => {
    //             return !!effectUnits.find((x: EffectUnit) => {
    //                 if (!this.actionSector) {
    //                     return true;
    //                 }
    //
    //                 const id = this.actionSector.id;
    //                 return x.failActionId === id || x.inputActionId === id || x.successActionId === id;
    //             });
    //         })
    //     );
    // }
    //
    // public deleteActionUnitInstance() {
    //     if (!this.actionSector) {
    //         return;
    //     }
    //
    //     this.store.dispatch(actionUnitInstanceCrud.actions.Delete(this.actionSector.id));
    //
    //     setTimeout(() => {
    //         this.store.dispatch(actionUnitInstanceCrud.actions.Get());
    //     }, 100);
    // }
}
