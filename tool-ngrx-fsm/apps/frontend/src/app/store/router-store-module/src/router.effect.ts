import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { first, map, switchMap, tap } from 'rxjs/operators';

import { RouterActions } from './router.action';
import { ROUTER_SEL } from './router.selector';
import { RouterService } from './router.service';

@Injectable()
export class RouterEffect {
  NavigateToReturnUrl = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RouterActions.NavigateToReturnUrl),
        switchMap((data) =>
          this.store.select(ROUTER_SEL.getReturnUrl).pipe(
            first(),
            tap((returnUrl) => {
              this.routerService.navigate([returnUrl]);
            })
          )
        )
      );
    },
    { dispatch: false }
  );

  // routerRequestAction = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(routerRequestAction),
  //       tap((d) => console.log(d))
  //     );
  //   },
  //   { dispatch: false }
  // );
  // routerNavigationAction = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(routerNavigationAction),
  //       tap((d) => console.log(d))
  //     );
  //   },
  //   { dispatch: false }
  // );
  // routerNavigatedAction = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(routerNavigatedAction),
  //       tap((d) => console.log(d))
  //     );
  //   },
  //   { dispatch: false }
  // );
  // routerCancelAction = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(routerCancelAction),
  //       tap((d) => console.log(d))
  //     );
  //   },
  //   { dispatch: false }
  // );
  //
  // routerErrorAction = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(routerErrorAction),
  //       tap((d) => console.log(d))
  //     );
  //   },
  //   { dispatch: false }
  // );

  constructor(private actions$: Actions, private store: Store, private routerService: RouterService) {}
}
