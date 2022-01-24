import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { InterfaceConverterUnit, InterfaceUnit } from '@ngrx-fsm/common';
import { Store } from '@ngrx/store';

import { interfaceConverterUnitCrud, interfaceUnitCrud } from '../../../../store/crud-store-module';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-interface-converter-list-item',
    templateUrl: './interface-converter-list-item.component.html',
    styleUrls: ['./interface-converter-list-item.component.scss']
})
export class InterfaceConverterListItemComponent implements OnInit, OnChanges {
    @Input() item: InterfaceConverterUnit | null = null;

    interfaces$: Observable<InterfaceUnit[]> = this.store.select(interfaceUnitCrud.selector.listItems);

    public formGroup: FormGroup = this.newFormGroup;

    editMode = false;

    constructor(private store: Store, private fb: FormBuilder) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        this.updateInterfaceFG(changes.item.currentValue);
    }

    private updateInterfaceFG(interfaceEl: InterfaceConverterUnit): void {
        const { id = '', name = '', path = '', inputInterfaceId = null, outputInterfaceId = null } = interfaceEl;

        this.formGroup.setValue({ id, name, path, inputInterfaceId, outputInterfaceId });
    }

    private get newFormGroup(): FormGroup {
        const controls: Record<keyof InterfaceConverterUnit, any> = {
            id: new FormControl(''),
            name: new FormControl(''),
            path: new FormControl(''),
            inputInterfaceId: new FormControl(''),
            outputInterfaceId: new FormControl('')
        };
        return new FormGroup(controls);
    }

    public onUpdateInterface(): void {
        const interfaceUnit: InterfaceConverterUnit = this.formGroup.value;

        this.store.dispatch(
            interfaceConverterUnitCrud.actions.Update(interfaceUnit.id, {
                ...interfaceUnit,
                inputInterface: null,
                outputInterface: null
            })
        );

        this.editMode = false;
    }
}
