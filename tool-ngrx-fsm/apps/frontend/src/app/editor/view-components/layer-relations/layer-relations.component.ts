import { Component } from '@angular/core';
import {
    ActionUnitDeepPopulated,
    ActionUnitInstanceDeepPopulated,
    EffectUnitDeepPopulated,
    InterfaceConverterUnitDeepPopulated,
    InterfaceUnitDeepPopulated
} from '@ngrx-fsm/common';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';

import { SizeService } from '../../../services/size.service';
import { actionUnitCrud, actionUnitInstanceCrud, effectUnitCrud, interfaceConverterUnitCrud, interfaceUnitCrud } from '../../../store/crud-store-module';
import { ActionInstanceComponent } from '../../inner-components/ui-elements/action-instance/action-instance.component';
import { EffectInstanceComponent } from '../../inner-components/ui-elements/effect-instance/effect-instance.component';

import { Arrow, LineService, SvgArrow } from './line.service';

@Component({
    selector: 'app-layer-relations',
    templateUrl: './layer-relations.component.html',
    styleUrls: ['./layer-relations.component.scss']
})
export class LayerRelationsComponent {
    interfaces$: Observable<InterfaceUnitDeepPopulated[]> = this.store.select(interfaceUnitCrud.selector.listItems);
    interfaceConverters$: Observable<InterfaceConverterUnitDeepPopulated[]> = this.store.select(interfaceConverterUnitCrud.selector.listItems);
    actions$: Observable<ActionUnitDeepPopulated[]> = this.store.select(actionUnitCrud.selector.listItems);
    actionInstances$: Observable<ActionUnitInstanceDeepPopulated[]> = this.store.select(actionUnitInstanceCrud.selector.listItems);
    effects$: Observable<EffectUnitDeepPopulated[]> = this.store.select(effectUnitCrud.selector.listItems);

    constructor(private store: Store, private lineService: LineService, private sizeService: SizeService) {}

    get effectInputActionArrows$(): Observable<(Arrow<EffectUnitDeepPopulated> | null)[]> {
        return combineLatest([this.effects$, this.actionInstances$]).pipe(
            map(([effects, actions]: [EffectUnitDeepPopulated[], ActionUnitInstanceDeepPopulated[]]): (Arrow<EffectUnitDeepPopulated> | null)[] => {
                return effects.map((item: EffectUnitDeepPopulated): Arrow<EffectUnitDeepPopulated> | null => {
                    if (!item.inputActionId) {
                        return null;
                    }

                    const inputAction: ActionUnitInstanceDeepPopulated | null = actions.find((x) => x.id === item.inputActionId) || null;

                    if (!inputAction) {
                        return null;
                    }

                    return {
                        id: item.id,
                        start: ActionInstanceComponent.getOutputPosition(inputAction),
                        end: EffectInstanceComponent.getInputActionHangerPosition(item)
                    };
                });
            })
        );
    }

    get effectSuccessActionArrows$(): Observable<(Arrow<EffectUnitDeepPopulated> | null)[]> {
        return combineLatest([this.effects$, this.actionInstances$]).pipe(
            map(([effects, actions]: [EffectUnitDeepPopulated[], ActionUnitInstanceDeepPopulated[]]): (Arrow<EffectUnitDeepPopulated> | null)[] => {
                return effects.map((item: EffectUnitDeepPopulated): Arrow<EffectUnitDeepPopulated> | null => {
                    if (!item.successActionId) {
                        return null;
                    }

                    const successAction: ActionUnitInstanceDeepPopulated | null = actions.find((x) => x.id === item.successActionId) || null;

                    if (!successAction) {
                        return null;
                    }

                    return {
                        id: item.id,
                        start: EffectInstanceComponent.getSuccessOutputPosition(item),
                        end: ActionInstanceComponent.getInputPosition(successAction)
                    };
                });
            })
        );
    }

    get effectFailActionArrows$(): Observable<(Arrow<EffectUnitDeepPopulated> | null)[]> {
        return combineLatest([this.effects$, this.actionInstances$]).pipe(
            //
            map(([effects, actions]: [EffectUnitDeepPopulated[], ActionUnitInstanceDeepPopulated[]]): (Arrow<EffectUnitDeepPopulated> | null)[] => {
                //
                return effects.map((item: EffectUnitDeepPopulated): Arrow<EffectUnitDeepPopulated> | null => {
                    if (!item.failActionId) {
                        return null;
                    }

                    const failAction: ActionUnitInstanceDeepPopulated | null = actions.find((x) => x.id === item.failActionId) || null;

                    if (!failAction) {
                        return null;
                    }

                    return {
                        id: item.id,
                        start: EffectInstanceComponent.getFailOutputPosition(item),
                        end: ActionInstanceComponent.getInputPosition(failAction)
                    };
                });
            })
        );
    }

    trackByActionEffectConnectionArrows(index: number, item: Arrow<EffectUnitDeepPopulated> | null) {
        if (!item) {
            return;
        }
        return `${index}${item.start.hangerPositionX} ${item.start.hangerPositionY} ${item.end.hangerPositionX} ${item.end.hangerPositionY}`;
    }

    trackByActionEffectConnectionSuccessActionArrows(index: number, item: Arrow<EffectUnitDeepPopulated> | null) {
        return item;

        // if (!item) {
        //     return;
        // }
        // return `${index}${item.start.hangerPositionX} ${item.start.hangerPositionY} ${item.end.hangerPositionX} ${item.end.hangerPositionY}`;
    }

    trackByActionEffectConnectionFailActionArrows(index: number, item: Arrow<EffectUnitDeepPopulated> | null) {
        if (!item) {
            return;
        }
        return `${index}${item.start.hangerPositionX} ${item.start.hangerPositionY} ${item.end.hangerPositionX} ${item.end.hangerPositionY}`;
    }

    onDeleteInterfaceActionConnection(arrow: Arrow<EffectUnitDeepPopulated>) {
        const findOne: Observable<ActionUnitDeepPopulated | undefined> = this.actions$.pipe(map((x) => x.find((y) => y.id === arrow.id)));

        findOne
            .pipe(
                tap((x) => {
                    if (!x) {
                        return;
                    }
                    this.store.dispatch(
                        actionUnitCrud.actions.Update(arrow.id, {
                            ...x,
                            inputInterfaceId: null
                        })
                    );
                })
            )
            .pipe(first())
            .subscribe();
    }

    onDeleteActionEffectConnection(arrow: Arrow<EffectUnitDeepPopulated> | null) {
        if (!arrow) {
            return;
        }

        const effectSectors$: Observable<EffectUnitDeepPopulated[]> = this.store.select(effectUnitCrud.selector.listItems);

        const findOne: Observable<EffectUnitDeepPopulated | undefined> = effectSectors$.pipe(
            map((x: EffectUnitDeepPopulated[]) => x.find((y: EffectUnitDeepPopulated) => y.id === arrow.id))
        );

        findOne
            .pipe(
                tap((x) => {
                    if (!x) {
                        return;
                    }
                    this.store.dispatch(
                        effectUnitCrud.actions.Update(arrow.id, {
                            ...x,
                            inputActionId: null
                        })
                    );
                })
            )
            .pipe(first())
            .subscribe();
    }

    onDeleteEffectUnitSuccessOutput(arrow: Arrow<EffectUnitDeepPopulated> | null) {
        if (!arrow) {
            return;
        }

        const effectSectors$: Observable<EffectUnitDeepPopulated[]> = this.store.select(effectUnitCrud.selector.listItems);

        const findOne: Observable<EffectUnitDeepPopulated | undefined> = effectSectors$.pipe(
            map((x: EffectUnitDeepPopulated[]) => x.find((y: EffectUnitDeepPopulated) => y.id === arrow.id))
        );

        findOne
            .pipe(
                tap((x) => {
                    if (!x) {
                        return;
                    }
                    this.store.dispatch(
                        effectUnitCrud.actions.Update(arrow.id, {
                            ...x,
                            successActionId: null
                        })
                    );
                })
            )
            .pipe(first())
            .subscribe();
    }

    onDeleteEffectUnitFailOutput(arrow: Arrow<EffectUnitDeepPopulated> | null) {
        if (!arrow) {
            return;
        }

        const effectSectors$: Observable<EffectUnitDeepPopulated[]> = this.store.select(effectUnitCrud.selector.listItems);

        const findOne: Observable<EffectUnitDeepPopulated | undefined> = effectSectors$.pipe(
            map((x: EffectUnitDeepPopulated[]) => x.find((y: EffectUnitDeepPopulated) => y.id === arrow.id))
        );

        findOne
            .pipe(
                tap((x) => {
                    if (!x) {
                        return;
                    }
                    this.store.dispatch(
                        effectUnitCrud.actions.Update(arrow.id, {
                            ...x,
                            failActionId: null,
                            failAction: null,
                            successAction: null,
                            inputAction: null
                        })
                    );
                })
            )
            .pipe(first())
            .subscribe();
    }

    calculatedArrow(arrow: Arrow<EffectUnitDeepPopulated> | null): SvgArrow | null {
        if (!arrow) {
            return null;
        }

        return this.lineService.createLine(arrow.start, arrow.end);
    }

    trackBySvgPath(index: number, d: string) {
        return `${index} ${d}`;
    }

    get arrowWidth(): number {
        return this.sizeService.ARROW_WIDTH;
    }
}
