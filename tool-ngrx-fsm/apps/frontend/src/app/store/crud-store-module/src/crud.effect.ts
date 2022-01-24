import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, debounceTime, map, mergeMap } from 'rxjs/operators';

import { CrudInternalActions } from './crud.action';
import { CrudService, paginationDefault } from './crud.service';

@Injectable()
export class CrudEffect {
    GetEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CrudInternalActions.Get),
            mergeMap((data) => {
                return this.endpointService.getAll(data.endpoint, data.pagination).pipe(
                    map((res) => {
                        return CrudInternalActions.GetSuccess({ endpoint: data.endpoint, list: res.results, count: res.count });
                    }),
                    catchError((e) => {
                        return of(CrudInternalActions.GetFail({ endpoint: data.endpoint, error: e }));
                    })
                );
            })
        );
    });

    GetByIdEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CrudInternalActions.GetById),
            mergeMap((data) => {
                return this.endpointService.getOne(data.endpoint, data.id).pipe(
                    map((res) => {
                        return CrudInternalActions.GetByIdSuccess({ endpoint: data.endpoint, one: res });
                    }),
                    catchError((e) => {
                        return of(CrudInternalActions.GetByIdFail({ endpoint: data.endpoint, error: e }));
                    })
                );
            })
        );
    });

    CreateEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CrudInternalActions.Create),
            mergeMap((data) => {
                return this.endpointService.create(data.endpoint, data.one).pipe(
                    map((res) => {
                        return CrudInternalActions.CreateSuccess({ endpoint: data.endpoint, one: res });
                    }),
                    catchError((e) => {
                        return of(CrudInternalActions.CreateFail({ endpoint: data.endpoint, error: e }));
                    })
                );
            })
        );
    });

    UpdateEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CrudInternalActions.Update),
            debounceTime(300),
            mergeMap((data) => {
                return this.endpointService.patchOne(data.endpoint, data.id, data.one).pipe(
                    map((res) => {
                        return CrudInternalActions.UpdateSuccess({ endpoint: data.endpoint, one: res });
                    }),
                    catchError((e) => {
                        return of(CrudInternalActions.UpdateFail({ endpoint: data.endpoint, error: e }));
                    })
                );
            })
        );
    });

    UpdateListAfterPatch$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CrudInternalActions.UpdateSuccess),
            mergeMap((x) => {
                return of(CrudInternalActions.Get({ pagination: paginationDefault(), endpoint: x.endpoint }));
            })
        );
    });

    DeleteEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CrudInternalActions.Delete),
            mergeMap((data) => {
                return this.endpointService.deleteOne(data.endpoint, data.id).pipe(
                    map(() => {
                        return CrudInternalActions.DeleteSuccess({ endpoint: data.endpoint, id: data.id });
                    }),
                    catchError((e) => {
                        return of(CrudInternalActions.DeleteFail({ endpoint: data.endpoint, error: e }));
                    })
                );
            })
        );
    });

    constructor(private actions$: Actions, private store: Store, private endpointService: CrudService) {}
}
