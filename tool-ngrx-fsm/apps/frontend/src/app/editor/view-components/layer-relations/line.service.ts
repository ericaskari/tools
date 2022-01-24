import { Injectable } from '@angular/core';

import { Position, SizeService } from '../../../services/size.service';

export interface Arrow<T> {
    id: string;
    start: Hanger;
    end: Hanger;
}

export interface Hanger {
    hangerPositionX: number;
    hangerPositionY: number;
}

export interface Size {
    width: number;
    height: number;
}

export interface Location {
    left: string;
    top: string;
}

export interface SvgArrowPosition {
    left: number;
    top: number;
    width: number;
    height: number;
}

export interface SvgArrowStyle {
    left: string;
    top: string;
    width: string;
    height: string;
    position: string;
}

export interface SvgArrow {
    paths: string[];
    style: SvgArrowStyle;
    position: SvgArrowPosition;
    delete: Location;
}

@Injectable({
    providedIn: 'root'
})
export class LineService {
    constructor(private sizeService: SizeService) {}

    createLine(startPosition: Hanger, endPosition: Hanger): SvgArrow {
        const { style, position } = this.calculateSvgSizeAndPlace();

        // const startComponentX = startPosition.hangerPositionX - position.left;
        // const startComponentY = startPosition.hangerPositionY - position.top;
        // const targetComponentX = endPosition.hangerPositionX - position.left;
        // const targetComponentY = endPosition.hangerPositionY - position.top;

        const startComponentX = startPosition.hangerPositionX;
        const startComponentY = startPosition.hangerPositionY;
        const targetComponentX = endPosition.hangerPositionX;
        const targetComponentY = endPosition.hangerPositionY;

        const deletePosition = this.calculateDeleteButtonLocation(targetComponentX, targetComponentY);

        //  not on left side
        if (startComponentX > targetComponentX) {
            return {
                paths: [`M ${startComponentX} ${startComponentY} ${targetComponentX} ${targetComponentY}`],
                style,
                position,
                delete: deletePosition
            };
        }

        //  sameLine
        if (startComponentY === targetComponentY) {
            return {
                paths: [`M ${startComponentX} ${startComponentY} H ${targetComponentX}`],
                style,
                position,
                delete: deletePosition
            };
        }

        const radios = 25;

        const pullBarX = startComponentX + this.sizeService.DASHBOARD_SNAPPINESS;

        const startPullY = startComponentY;

        const endPullY = targetComponentY;

        const endDestinationY = targetComponentY;

        const startLine = `M ${startComponentX} ${startComponentY} H ${startComponentX + (this.sizeService.DASHBOARD_SNAPPINESS - radios)}`;

        const newStartDestinationY = startComponentY < targetComponentY ? startComponentY + radios : startComponentY - radios;

        const startCurveStartX = pullBarX - radios;

        const startCurve = `M ${startCurveStartX} ${startComponentY} C ${pullBarX} ${startPullY}   ${pullBarX} ${startPullY} ${pullBarX} ${newStartDestinationY} `;

        const newEndStartY = startComponentY < targetComponentY ? targetComponentY - radios : targetComponentY + radios;

        const endCurveEndX = pullBarX + radios;

        const endCurve = `M ${pullBarX} ${newEndStartY} C ${pullBarX} ${endPullY}   ${pullBarX} ${endPullY} ${endCurveEndX} ${endDestinationY} `;

        const verticalLine = `M ${pullBarX} ${newStartDestinationY} V ${newEndStartY}`;

        const endLine = `M ${endCurveEndX} ${endDestinationY} H ${targetComponentX}`;

        return {
            paths: [startLine, startCurve, endCurve, verticalLine, endLine],
            style,
            position,
            delete: deletePosition
        };
    }

    calculateSvgSizeAndPlace(): { style: SvgArrowStyle; position: SvgArrowPosition } {
        // const startComponentWidth = startComponent.width;
        // const startComponentX = startComponent.positionX;
        // const startComponentY = startComponent.positionY;
        //
        // const targetComponentX = targetComponent.positionX;
        // const targetComponentY = targetComponent.positionY;
        //
        // const targetComponentBottomY = targetComponentY + targetComponent.height;
        // const startComponentBottomY = startComponentY + startComponent.height;
        //
        // const left = Math.min(startComponentX, targetComponentX) + startComponentWidth;
        // const top = Math.min(startComponentY, targetComponentY);
        // const width = Math.abs(targetComponentX - startComponentX) - startComponentWidth;
        // const height = Math.abs(top - Math.max(targetComponentBottomY, startComponentBottomY));
        // return {
        //     style: {
        //         width: `${width}px`,
        //         height: `${height}px`,
        //         left: `${left}px`,
        //         top: `${top}px`,
        //         position: 'absolute'
        //     },
        //     position: {
        //         width,
        //         height,
        //         left,
        //         top
        //     }
        // };

        return {
            style: {
                width: `${this.sizeService.DASHBOARD_WIDTH}px`,
                height: `${this.sizeService.DASHBOARD_HEIGHT}px`,
                left: `0px`,
                top: `0px`,
                position: 'absolute'
            },
            position: {
                width: this.sizeService.DASHBOARD_WIDTH,
                height: this.sizeService.DASHBOARD_HEIGHT,
                left: 0,
                top: 0
            }
        };
    }

    calculateDeleteButtonLocation(targetComponentX: number, targetComponentY: number): Location {
        return {
            left: `${targetComponentX - 100}px`,
            top: `${targetComponentY}px`
        };
    }
}
