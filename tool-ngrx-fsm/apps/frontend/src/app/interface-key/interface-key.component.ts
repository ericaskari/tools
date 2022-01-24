import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { InterfaceUnitKeyTypes } from '@ngrx-fsm/common';

@Component({
    selector: 'app-interface-key',
    templateUrl: './interface-key.component.html',
    styleUrls: ['./interface-key.component.scss']
})
export class InterfaceKeyComponent implements OnInit {
    @Input() formGroup: FormGroup | undefined;

    interfaceUnitKeyTypes = Object.values(InterfaceUnitKeyTypes);

    constructor() {}

    ngOnInit(): void {}

    getFormControlAsFormArray(key: AbstractControl): FormArray {
        return (key as unknown) as FormArray;
    }

    getKeyFormGroup(key: AbstractControl): FormGroup {
        return (key as unknown) as FormGroup;
    }

    public onAddInterfaceUnitKey(formArray: FormArray): void {
        const controllers = {
            type: new FormControl(),
            name: new FormControl(),
            hasNode: new FormControl(),
            isFixed: new FormControl(),
            isUnion: new FormControl(),
            nodes: new FormArray([])
        };

        formArray.push(new FormGroup(controllers));
    }
}
