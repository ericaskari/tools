import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createSelector, createFeatureSelector } from '@ngrx/store';

import { RouterStateUrl } from './router.serializer';
import { FeatureStoreNamesEnum } from '../../store-names.enum';

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>(FeatureStoreNamesEnum.ROUTER_REDUCER);

const getParamUserId = createSelector(getRouterState, (routerState) => routerState.state.params.userId);
const getParamGroupId = createSelector(getRouterState, (routerState) => routerState.state.params.groupId);

const getState = createSelector(getRouterState, (routerState) => routerState);
const getParams = createSelector(getRouterState, (routerState) => routerState.state.params);

const getQueryParams = createSelector(getRouterState, (routerState) => routerState.state.queryParams);

const getReturnUrl = createSelector(getRouterState, (routerState) => (routerState.state.queryParams.returnUrl ? routerState.state.queryParams.returnUrl : '/home'));

export const ROUTER_SEL = { getParamUserId, getState, getParams, getQueryParams, getReturnUrl, getParamGroupId };

export const selectRouter = createFeatureSelector<RouterReducerState>('router');

export const { selectCurrentRoute, selectFragment, selectQueryParams, selectQueryParam, selectRouteParams, selectRouteParam, selectRouteData, selectUrl } = getSelectors(
    selectRouter
);
