import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Position } from '../../../../services/size.service';

@Component({
    selector: 'app-ui-element-hanger',
    templateUrl: './ui-element-hanger.component.html',
    styleUrls: ['./ui-element-hanger.component.scss']
})
export class UiElementHangerComponent implements OnInit {
    @Input() position: Position = { positionX: 0, positionY: 0 };
    @Input() tooltip: string = '';
    @Input() disableHanger: boolean = false;
    @Input() icon: string = 'radio_button_checked';
    @Input() isInput: boolean = false;

    @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

    constructor() {}

    ngOnInit(): void {}

    public get style(): Record<string, string> {
        return {
            position: 'absolute',
            left: `${this.position.positionX}px`,
            top: `${this.position.positionY}px`,
            transform: this.isInput ? 'translateY(-50%)' : 'translateX(-100%) translateY(-50%)',
            'flex-direction': this.isInput ? 'row-reverse' : 'row'
        };
    }

    // .container-button {
    //     position: absolute;
    //     left: 0;
    //     top: 50%;
    //     transform: translateX(-50%) translateY(-50%);
    // }
    public get buttonStyle(): Record<string, string> {
        return {
            position: 'absolute',
            left: this.isInput ? `0` : 'unset',
            right: this.isInput ? 'unset' : '0',
            top: `50%`,
            transform: this.isInput ? 'translateX(-50%) translateY(-50%)' : 'translateX(50%) translateY(-50%)'
        };
    }
}
