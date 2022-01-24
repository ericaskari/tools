import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';

import { CrudEndpointsEnum } from '../../../enums/crud-endpoints.enum';
import { FeatureStoreNamesEnum } from '../../../enums/store-names.enum';
import { Pagination } from '../../../models/pagination.model';
import { RequestError } from '../../../models/request.error';

import { CrudCreateSubState, CrudDeleteSubState, CrudGetOneSubState, CrudGetSubState, CrudPatchSubState, CrudPieceState, CrudReducerState } from './crud.reducer';

const getState = createFeatureSelector<CrudReducerState>(FeatureStoreNamesEnum.CRUDS);

export type PublicSelector<Y> = MemoizedSelector<object, Y, DefaultProjectorFn<Y>>;

export class CrudSelectors<T, NEW_T> {
    state = createSelector(getState, (state: CrudReducerState): CrudPieceState<T, NEW_T> => state[this.endpoint] as CrudPieceState<T, NEW_T>);

    list = createSelector(this.state, this.pieceStateGetter.get);

    getOne: PublicSelector<CrudGetOneSubState<T>> = createSelector(this.state, this.pieceStateGetter.getOne);

    create: MemoizedSelector<object, CrudCreateSubState<T, NEW_T>, DefaultProjectorFn<CrudCreateSubState<T, NEW_T>>> = createSelector(this.state, this.pieceStateGetter.create);

    createItem = createSelector(this.create, this.crudCreateSubStateGetter.item);

    patch: PublicSelector<CrudPatchSubState<T>> = createSelector(this.state, this.pieceStateGetter.patch);

    delete: PublicSelector<CrudDeleteSubState> = createSelector(this.state, this.pieceStateGetter.delete);

    listItems: MemoizedSelector<object, T[], DefaultProjectorFn<T[]>> = createSelector(this.list, this.crudGetSubStateGetter.items);

    listCount: PublicSelector<number> = createSelector(this.list, this.crudGetSubStateGetter.count);

    listPagination: PublicSelector<Pagination> = createSelector(this.list, this.crudGetSubStateGetter.pagination);

    listLoading: PublicSelector<boolean> = createSelector(this.list, this.crudGetSubStateGetter.isLoading);

    listSucceeded: PublicSelector<boolean> = createSelector(this.list, this.crudGetSubStateGetter.succeeded);

    listFailed: PublicSelector<boolean> = createSelector(this.list, this.crudGetSubStateGetter.failed);

    listError: PublicSelector<RequestError> = createSelector(this.list, this.crudGetSubStateGetter.error);

    getOneItem: PublicSelector<T> = createSelector(this.getOne, this.crudGetOneSubStateGetter.item);

    getOneLoading: PublicSelector<boolean> = createSelector(this.getOne, this.crudGetOneSubStateGetter.isLoading);

    getOneSucceeded: PublicSelector<boolean> = createSelector(this.getOne, this.crudGetOneSubStateGetter.succeeded);

    getOneFailed: PublicSelector<boolean> = createSelector(this.getOne, this.crudGetOneSubStateGetter.failed);

    getOneError: PublicSelector<RequestError> = createSelector(this.getOne, this.crudGetOneSubStateGetter.error);

    updateItemToPatch: PublicSelector<T> = createSelector(this.patch, this.crudPatchSubStateGetter.itemToPatch);

    updatePatchedItem: PublicSelector<T> = createSelector(this.patch, this.crudPatchSubStateGetter.patchedItem);

    updateLoading: PublicSelector<boolean> = createSelector(this.patch, this.crudPatchSubStateGetter.isLoading);

    updateSucceeded: PublicSelector<boolean> = createSelector(this.patch, this.crudPatchSubStateGetter.succeeded);

    updateFailed: PublicSelector<boolean> = createSelector(this.patch, this.crudPatchSubStateGetter.failed);

    updateError: PublicSelector<RequestError> = createSelector(this.patch, this.crudPatchSubStateGetter.error);

    deleteIdToDelete: PublicSelector<string> = createSelector(this.delete, this.crudDeleteSubStateGetter.id);

    deleteLoading: PublicSelector<boolean> = createSelector(this.delete, this.crudDeleteSubStateGetter.isLoading);

    deleteSucceeded: PublicSelector<boolean> = createSelector(this.delete, this.crudDeleteSubStateGetter.succeeded);

    deleteFailed: PublicSelector<boolean> = createSelector(this.delete, this.crudDeleteSubStateGetter.failed);

    deleteError: PublicSelector<RequestError> = createSelector(this.delete, this.crudDeleteSubStateGetter.error);

    constructor(private endpoint: CrudEndpointsEnum) {}

    private get pieceStateGetter() {
        return {
            get: (state: CrudPieceState<T, NEW_T>): CrudGetSubState<T> => state.get,
            getOne: (state: CrudPieceState<T, NEW_T>): CrudGetOneSubState<T> => state.getOne,
            create: (state: CrudPieceState<T, NEW_T>): CrudCreateSubState<T, NEW_T> => state.create,
            patch: (state: CrudPieceState<T, NEW_T>): CrudPatchSubState<T> => state.patch,
            delete: (state: CrudPieceState<T, NEW_T>): CrudDeleteSubState => state.delete
        };
    }

    private get crudGetSubStateGetter() {
        return {
            isLoading: (state: CrudGetSubState<T>): boolean => state.loading,
            succeeded: (state: CrudGetSubState<T>): boolean => state.loaded,
            failed: (state: CrudGetSubState<T>): boolean => !!state.error,
            error: (state: CrudGetSubState<T>): RequestError => <RequestError>state.error,
            items: (state: CrudGetSubState<T>): T[] => state.items,
            count: (state: CrudGetSubState<T>): number => state.count,
            pagination: (state: CrudGetSubState<T>): Pagination => state.pagination
        };
    }

    private get crudGetOneSubStateGetter() {
        return {
            isLoading: (state: CrudGetOneSubState<T>): boolean => state.loading,
            succeeded: (state: CrudGetOneSubState<T>): boolean => state.loaded,
            failed: (state: CrudGetOneSubState<T>): boolean => !!state.error,
            error: (state: CrudGetOneSubState<T>): RequestError => <RequestError>state.error,
            item: (state: CrudGetOneSubState<T>): T => <T>state.item
        };
    }

    private get crudPatchSubStateGetter() {
        return {
            isLoading: (state: CrudPatchSubState<T>): boolean => state.loading,
            succeeded: (state: CrudPatchSubState<T>): boolean => state.loaded,
            failed: (state: CrudPatchSubState<T>): boolean => !!state.error,
            error: (state: CrudPatchSubState<T>): RequestError => <RequestError>state.error,
            itemToPatch: (state: CrudPatchSubState<T>): T => <T>state.itemToPatch,
            patchedItem: (state: CrudPatchSubState<T>): T => <T>state.patchedItem
        };
    }
    private get crudDeleteSubStateGetter() {
        return {
            isLoading: (state: CrudDeleteSubState): boolean => state.loading,
            succeeded: (state: CrudDeleteSubState): boolean => state.loaded,
            failed: (state: CrudDeleteSubState): boolean => !!state.error,
            error: (state: CrudDeleteSubState): RequestError => <RequestError>state.error,
            id: (state: CrudDeleteSubState): string => <string>state.id
        };
    }
    private get crudCreateSubStateGetter() {
        return {
            isLoading: (state: CrudCreateSubState): boolean => state.loading,
            succeeded: (state: CrudCreateSubState): boolean => state.loaded,
            failed: (state: CrudCreateSubState): boolean => !!state.error,
            error: (state: CrudCreateSubState): RequestError => <RequestError>state.error,
            item: (state: CrudCreateSubState): string => <string>state.item,
            newItem: (state: CrudCreateSubState): string => <string>state.newItem
        };
    }
}
