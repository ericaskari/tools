import { createFeatureSelector } from '@ngrx/store';
import { FeatureStoreNamesEnum } from '../store-names.enum';
import { InterfaceStoreState } from './interface.reducer';

export const getInterfacesState = createFeatureSelector<InterfaceStoreState>(FeatureStoreNamesEnum.INTERFACES);
