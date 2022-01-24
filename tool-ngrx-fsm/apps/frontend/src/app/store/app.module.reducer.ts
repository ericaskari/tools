import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { FeatureStoreNamesEnum } from './store-names.enum';
import { interfaceStoreReducer, InterfaceStoreState } from './interface-store-module/interface.reducer';

export interface AppModuleState {
    [FeatureStoreNamesEnum.INTERFACES]: InterfaceStoreState;
}

export const rootActionReducerMap: ActionReducerMap<AppModuleState> = {
    [FeatureStoreNamesEnum.INTERFACES]: interfaceStoreReducer
};

export const rootMetaReducers: MetaReducer<AppModuleState>[] = !environment.production ? [] : [];
