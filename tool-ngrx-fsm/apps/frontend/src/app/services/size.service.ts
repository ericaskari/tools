import { Injectable } from '@angular/core';

export interface Size {
    width: number;
    height: number;
}

export interface Position {
    positionX: number;
    positionY: number;
}

export interface Location {
    size: Size;
    position: Position;
}

@Injectable({
    providedIn: 'root'
})
export class SizeService {
    public ARROW_WIDTH = 2;
    private ACTION_SECTOR_WIDTH = 400;
    private ACTION_SECTOR_HEIGHT = 100;
    public DASHBOARD_WIDTH = 2000;
    public DASHBOARD_HEIGHT = 1000;
    public DASHBOARD_SNAPPINESS = 50;

    get actionSectorStyle() {
        return {
            width: `${this.ACTION_SECTOR_WIDTH}px`,
            height: `${this.ACTION_SECTOR_HEIGHT}px`
        };
    }

    get actionSectorSize() {
        return {
            width: this.ACTION_SECTOR_WIDTH,
            height: this.ACTION_SECTOR_HEIGHT
        };
    }
}
