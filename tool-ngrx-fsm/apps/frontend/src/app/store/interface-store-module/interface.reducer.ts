import { createReducer, on } from '@ngrx/store';

export interface InterfaceStoreState {}

export const interfaceStoreState: InterfaceStoreState = {};

export const interfaceStoreReducer = createReducer<InterfaceStoreState>(interfaceStoreState);
