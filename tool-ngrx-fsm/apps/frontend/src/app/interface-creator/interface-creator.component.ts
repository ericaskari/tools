import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { InterfaceUnit, InterfaceUnitKey, InterfaceUnitKeyStatic, InterfaceUnitKeyTypes } from '@ngrx-fsm/common';

@Component({
    selector: 'app-interface-creator',
    templateUrl: './interface-creator.component.html',
    styleUrls: ['./interface-creator.component.scss']
})
export class InterfaceCreatorComponent implements OnInit {
    public interfaceFG: FormGroup = this.InitializeInterfaceFG();
    interfaceUnitKeyTypes = Object.values(InterfaceUnitKeyTypes);

    constructor() {}

    ngOnInit(): void {}

    get mainFormArray(): FormArray {
        return this.interfaceFG.controls.nodes as FormArray;
    }
    get keysFormArray(): FormArray {
        return this.interfaceFG.controls.nodes as FormArray;
    }

    getFormControlAsFormArray(key: AbstractControl): FormArray {
        return (key as unknown) as FormArray;
    }

    getKeyFormGroup(key: AbstractControl): FormGroup {
        return (key as unknown) as FormGroup;
    }

    private InitializeInterfaceFG(): FormGroup {
        const controllers = {
            id: new FormControl(''),
            name: new FormControl(''),
            nodes: new FormArray([])
        };

        return new FormGroup(controllers);
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

const int = {
    id: 'something',
    name: 'IActivity',
    nodes: [
        {
            type: 'string',
            name: 'name',
            hasNode: false,
            isFixed: null,
            nodes: []
        },
        {
            type: 'object',
            name: 'locations',
            hasNode: true,
            isFixed: false,
            isUnion: false,
            nodes: [
                {
                    type: 'number',
                    name: 'x',
                    hasNode: false,
                    isFixed: null,
                    nodes: []
                },
                {
                    type: 'number',
                    name: 'y',
                    hasNode: false,
                    isFixed: null,
                    nodes: []
                }
            ]
        },
        {
            type: 'interface',
            name: 'user',
            hasNode: false,
            isFixed: null,
            importPath: '../../user.model',
            importName: '../../user.model',
            nodes: []
        }
    ]
};
