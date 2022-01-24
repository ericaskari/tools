import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { InterfaceUnit, InterfaceUnitKey, InterfaceUnitKeyStatic, InterfaceUnitKeyTypes } from '@ngrx-fsm/common';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-interface-list-item',
    templateUrl: './interface-list-item.component.html',
    styleUrls: ['./interface-list-item.component.scss']
})
export class InterfaceListItemComponent implements OnInit, OnChanges {
    @Input() interfaceSector: InterfaceUnit | null = null;

    interfaceUnitKeyTypes = Object.values(InterfaceUnitKeyTypes);

    public interfaceFG: FormGroup = this.InitializeInterfaceFG();

    editMode = false;

    constructor(private store: Store, private fb: FormBuilder) {}

    ngOnInit(): void {}

    get keysFormArray(): FormArray {
        return this.interfaceFG.controls.keys as FormArray;
    }

    getKeyFormGroup(key: AbstractControl): FormGroup {
        return (key as unknown) as FormGroup;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateInterfaceFG(changes.interfaceSector.currentValue);
    }

    private updateInterfaceFG(interfaceEl: InterfaceUnit): void {
        const { id = '', name = '', keys = [] } = interfaceEl;

        this.interfaceFG.setValue({ id, name, keys: [] });
    }

    private InitializeInterfaceFG(): FormGroup {
        const controllers: Record<keyof InterfaceUnit, FormControl | FormArray> = {
            id: new FormControl(''),
            name: new FormControl(''),
            keys: new FormArray([])
        };

        return new FormGroup(controllers);
    }

    public onAddInterfaceUnitKey(): void {
        const controllers: Record<keyof InterfaceUnitKey, FormControl | FormArray | FormGroup> = {
            name: new FormControl(''),
            value: new FormGroup({
                type: new FormControl(),
                value: new FormControl()
            })
        };

        this.keysFormArray.push(new FormGroup(controllers));
    }
    public onAddInterfaceUnitKeyStatic(): void {
        const controllers: Record<keyof InterfaceUnitKeyStatic, FormControl | FormArray | FormGroup> = {
            type: new FormControl(InterfaceUnitKeyTypes.String),
            value: new FormControl('')
        };

        this.keysFormArray.push(new FormGroup(controllers));
    }

    public onUpdateInterface(): void {
        const interfaceUnit: InterfaceUnit = this.interfaceFG.value;

        // this.store.dispatch(interfaceUnitCrud.actions.Update(interfaceUnit.id, interfaceUnit));

        this.editMode = false;
    }
}
