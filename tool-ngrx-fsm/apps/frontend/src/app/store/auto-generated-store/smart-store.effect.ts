import { EndpointErrorModel } from '';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';

import { SmartStoreActions } from './smart-store.action';
import { SmartStoreEndpoint } from './smart-store.endpoint';
import { SomeType } from './types';

@Injectable()
export class CrudEffect {
    GetDataFromHeaven = createEffect(() => {
        return this.actions$.pipe(
            ofType(SmartStoreActions.GetAllUsers),
            mergeMap(({ actionData }) => {
                return this.smartStoreEndpoint.getAll(actionData).pipe(
                    map((endpointData: SomeType) => {
                        return SmartStoreActions.GetAllUsersSuccess2({ actionData: errorData });
                    }),
                    catchError((errorData: EndpointErrorModel) => {
                        return of(SmartStoreActions.GetAllUsersFail({ actionData: errorData }));
                    })
                );
            })
        );
    });

    constructor(private store: Store, private actions$: Actions, private smartStoreEndpoint: SmartStoreEndpoint) {}
}
