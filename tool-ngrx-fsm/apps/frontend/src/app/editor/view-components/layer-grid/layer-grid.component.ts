import { Component, OnInit } from '@angular/core';

import { SizeService } from '../../../services/size.service';

@Component({
    selector: 'app-layer-grid',
    templateUrl: './layer-grid.component.html',
    styleUrls: ['./layer-grid.component.scss']
})
export class LayerGridComponent implements OnInit {
    count = (this.sizeService.DASHBOARD_HEIGHT * this.sizeService.DASHBOARD_WIDTH) / (this.sizeService.DASHBOARD_SNAPPINESS * this.sizeService.DASHBOARD_SNAPPINESS);
    countArray = new Array(this.count).fill(1);
    rowCount = this.sizeService.DASHBOARD_WIDTH / this.sizeService.DASHBOARD_SNAPPINESS;

    snaps = this.countArray.map((x, i) => {
        const rowNumber = Math.trunc(i / this.rowCount);

        const colNumber = rowNumber * this.rowCount;

        const colPosition = i - colNumber;

        const left = colPosition * this.sizeService.DASHBOARD_SNAPPINESS;
        const top = rowNumber * this.sizeService.DASHBOARD_SNAPPINESS;
        return {
            left: left + this.sizeService.DASHBOARD_SNAPPINESS / 2,
            top: top + this.sizeService.DASHBOARD_SNAPPINESS / 2
        };
    });

    constructor(private sizeService: SizeService) {}

    ngOnInit(): void {}

    get dots(): number[] {
        return this.countArray;
    }

    getDotPosition(i: number): Record<string, string> {
        return {
            left: `100px`,
            top: '100px'
        };
    }

    gridTrackBy(index: number) {
        return index;
    }
}
