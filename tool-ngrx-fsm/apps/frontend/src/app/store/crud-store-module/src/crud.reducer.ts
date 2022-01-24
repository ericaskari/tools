import { createReducer, on } from '@ngrx/store';

import { CrudEndpointsEnum } from '../../../enums/crud-endpoints.enum';
import { Pagination } from '../../../models/pagination.model';
import { RequestError } from '../../../models/request.error';

import { CrudInternalActions } from './crud.action';
import { paginationDefault } from './crud.service';

//  loading: false loaded: false error NUll => normal
//  loading: true  loaded: false error NUll => loading
//  loading: ?     loaded: true  error NUll => succeeded
//  loading: ?     loaded: true  error some => errored

export interface CrudSubStateShared {
    loading: boolean;
    loaded: boolean;
    error: RequestError | null;
}

function sharedDefaults(): { loading: boolean; loaded: boolean; error: RequestError | null } {
    return {
        loaded: false,
        loading: false,
        error: null
    };
}

export interface CrudGetSubState<T = unknown> extends CrudSubStateShared {
    pagination: Pagination;
    count: number;
    items: T[];
}

export interface CrudGetOneSubState<T = unknown> extends CrudSubStateShared {
    id: string | null;
    item: T | null;
}

export interface CrudCreateSubState<T = unknown, NEW_T = unknown> extends CrudSubStateShared {
    newItem: NEW_T | null;
    item: T | null;
}

export interface CrudPatchSubState<T = unknown> extends CrudSubStateShared {
    itemToPatch: T | null;
    patchedItem: T | null;
}

export interface CrudDeleteSubState extends CrudSubStateShared {
    id: string | null;
}

export interface CrudPieceState<T = unknown, NEW_T = unknown> {
    get: CrudGetSubState<T>;

    getOne: CrudGetOneSubState<T>;

    create: CrudCreateSubState<T, NEW_T>;

    patch: CrudPatchSubState<T>;

    delete: CrudDeleteSubState;
}

function CrudPieceInitial<T, NEW_T>(): CrudPieceState<T, NEW_T> {
    return {
        get: {
            ...sharedDefaults(),
            items: [],
            count: 0,
            pagination: paginationDefault()
        },
        getOne: {
            ...sharedDefaults(),
            id: null,
            item: null
        },
        create: {
            ...sharedDefaults(),
            newItem: null,
            item: null
        },
        delete: {
            ...sharedDefaults(),
            id: null
        },
        patch: {
            ...sharedDefaults(),
            itemToPatch: null,
            patchedItem: null
        }
    };
}

export type CrudReducerState = {
    [endpoint in CrudEndpointsEnum]: CrudPieceState;
};

export const crudReducerInitialState: CrudReducerState = Object.values(CrudEndpointsEnum).reduce((prev, curr: CrudEndpointsEnum) => {
    return {
        ...prev,
        [curr]: CrudPieceInitial()
    };
}, {} as CrudReducerState);

const CrudInternalActionsGetSubReducer = (state: CrudReducerState, { endpoint, pagination }: { endpoint: CrudEndpointsEnum; pagination: Pagination }): CrudReducerState => {
    const oldCrudPieceState: CrudPieceState = state[endpoint];

    const oldCrudGetSubState: CrudGetSubState = oldCrudPieceState.get;

    const updatedCrudGetSubState: CrudGetSubState = {
        ...oldCrudGetSubState,
        loading: true,
        loaded: false,
        error: null,
        pagination
    };

    const piece: CrudPieceState = {
        ...oldCrudPieceState,
        get: updatedCrudGetSubState
    };

    return {
        ...state,
        [endpoint]: piece
    };
};

export const CrudReducer = createReducer(
    crudReducerInitialState,
    on(CrudInternalActions.Get, CrudInternalActionsGetSubReducer),
    on(
        CrudInternalActions.GetSuccess,
        (state, { endpoint, list, count }): CrudReducerState => {
            const oldCrudPieceState: CrudPieceState = state[endpoint];

            const oldCrudGetSubState: CrudGetSubState = oldCrudPieceState.get;

            const updatedCrudGetSubState: CrudGetSubState = {
                ...oldCrudGetSubState,
                loading: false,
                loaded: true,
                error: null,
                count,
                items: list
            };

            const piece: CrudPieceState = {
                ...oldCrudPieceState,
                get: updatedCrudGetSubState
            };

            return {
                ...state,
                [endpoint]: piece
            };
        }
    ),
    on(
        CrudInternalActions.GetFail,
        (state, { endpoint, error }): CrudReducerState => {
            const oldCrudPieceState: CrudPieceState = state[endpoint];

            const oldCrudGetSubState: CrudGetSubState = oldCrudPieceState.get;

            const updatedCrudGetSubState: CrudGetSubState = {
                ...oldCrudGetSubState,
                loading: false,
                loaded: true,
                error
            };

            const piece: CrudPieceState = {
                ...oldCrudPieceState,
                get: updatedCrudGetSubState
            };

            return {
                ...state,
                [endpoint]: piece
            };
        }
    ),
    on(
        CrudInternalActions.GetById,
        (state, { endpoint, id }): CrudReducerState => {
            const oldCrudPieceState: CrudPieceState = state[endpoint];

            const oldCrudGetSubState: CrudGetOneSubState = oldCrudPieceState.getOne;

            const updatedCrudGetOneSubState: CrudGetOneSubState = {
                ...oldCrudGetSubState,
                id,
                loading: true,
                loaded: false,
                error: null,
                item: null
            };

            const piece: CrudPieceState = {
                ...oldCrudPieceState,
                getOne: updatedCrudGetOneSubState
            };

            return {
                ...state,
                [endpoint]: piece
            };
        }
    ),
    on(
        CrudInternalActions.GetByIdSuccess,
        (state, { endpoint, one }): CrudReducerState => {
            const oldCrudPieceState: CrudPieceState = state[endpoint];

            const oldCrudGetSubState: CrudGetOneSubState = oldCrudPieceState.getOne;

            const updatedCrudGetOneSubState: CrudGetOneSubState = {
                ...oldCrudGetSubState,
                loading: false,
                loaded: true,
                error: null,
                item: one
            };

            const piece: CrudPieceState = {
                ...oldCrudPieceState,
                getOne: updatedCrudGetOneSubState
            };

            return {
                ...state,
                [endpoint]: piece
            };
        }
    ),
    on(
        CrudInternalActions.GetByIdFail,
        (state, { endpoint, error }): CrudReducerState => {
            const oldCrudPieceState: CrudPieceState = state[endpoint];

            const oldCrudGetSubState: CrudGetOneSubState = oldCrudPieceState.getOne;

            const updatedCrudGetOneSubState: CrudGetOneSubState = {
                ...oldCrudGetSubState,
                loading: false,
                loaded: true,
                item: null,
                error: error
            };

            const piece: CrudPieceState = {
                ...oldCrudPieceState,
                getOne: updatedCrudGetOneSubState
            };

            return {
                ...state,
                [endpoint]: piece
            };
        }
    ),
    on(
        CrudInternalActions.Update,
        (state, { endpoint, one }): CrudReducerState => {
            const oldCrudPieceState: CrudPieceState = state[endpoint];

            const oldCrudPatchSubState: CrudPatchSubState = oldCrudPieceState.patch;

            const oldCrudGetSubState: CrudGetSubState = oldCrudPieceState.get;

            const itemsInList = [...oldCrudGetSubState.items];

            const indexInList = itemsInList.findIndex((x: any) => x.id === one.id);

            const updatedCrudGetSubState: CrudGetSubState = {
                ...oldCrudGetSubState,
                items: itemsInList
            };

            if (indexInList !== -1) {
                updatedCrudGetSubState.items[indexInList] = one;
            }

            const updatedCrudPatchOneSubState: CrudPatchSubState = {
                ...oldCrudPatchSubState,
                loading: true,
                loaded: false,
                error: null,
                itemToPatch: one,
                patchedItem: null
            };

            const piece: CrudPieceState = {
                ...oldCrudPieceState,
                patch: updatedCrudPatchOneSubState,
                get: updatedCrudGetSubState
            };

            return {
                ...state,
                [endpoint]: piece
            };
        }
    ),
    on(
        CrudInternalActions.UpdateSuccess,
        (state, { endpoint, one }): CrudReducerState => {
            const oldCrudPieceState: CrudPieceState = state[endpoint];

            const oldCrudPatchSubState: CrudPatchSubState = oldCrudPieceState.patch;

            const updatedCrudPatchOneSubState: CrudPatchSubState = {
                ...oldCrudPatchSubState,
                loading: false,
                loaded: true,
                error: null,
                itemToPatch: one,
                patchedItem: one
            };

            const piece: CrudPieceState = {
                ...oldCrudPieceState,
                patch: updatedCrudPatchOneSubState
            };

            return {
                ...state,
                [endpoint]: piece
            };
        }
    ),
    on(
        CrudInternalActions.UpdateFail,
        (state, { endpoint, error }): CrudReducerState => {
            const oldCrudPieceState: CrudPieceState = state[endpoint];

            const oldCrudPatchSubState: CrudPatchSubState = oldCrudPieceState.patch;

            const updatedCrudPatchOneSubState: CrudPatchSubState = {
                ...oldCrudPatchSubState,
                loading: false,
                loaded: true,
                error,
                patchedItem: null
            };

            const piece: CrudPieceState = {
                ...oldCrudPieceState,
                patch: updatedCrudPatchOneSubState
            };

            return {
                ...state,
                [endpoint]: piece
            };
        }
    ),
    on(
        CrudInternalActions.Delete,
        (state, { endpoint, id }): CrudReducerState => {
            const oldCrudPieceState: CrudPieceState = state[endpoint];

            const oldCrudDeleteSubState: CrudDeleteSubState = oldCrudPieceState.delete;

            const updatedCrudDeleteOneSubState: CrudDeleteSubState = {
                ...oldCrudDeleteSubState,
                loading: true,
                loaded: false,
                error: null,
                id
            };

            const piece: CrudPieceState = {
                ...oldCrudPieceState,
                delete: updatedCrudDeleteOneSubState
            };

            return {
                ...state,
                [endpoint]: piece
            };
        }
    ),
    on(
        CrudInternalActions.DeleteSuccess,
        (state, { endpoint, id }): CrudReducerState => {
            const oldCrudPieceState: CrudPieceState = state[endpoint];

            const oldCrudDeleteSubState: CrudDeleteSubState = oldCrudPieceState.delete;

            const updatedCrudDeleteOneSubState: CrudDeleteSubState = {
                ...oldCrudDeleteSubState,
                loading: false,
                loaded: true,
                error: null,
                id
            };

            const piece: CrudPieceState = {
                ...oldCrudPieceState,
                delete: updatedCrudDeleteOneSubState
            };

            return {
                ...state,
                [endpoint]: piece
            };
        }
    ),
    on(
        CrudInternalActions.DeleteFail,
        (state, { endpoint, error }): CrudReducerState => {
            const oldCrudPieceState: CrudPieceState = state[endpoint];

            const oldCrudDeleteSubState: CrudDeleteSubState = oldCrudPieceState.delete;

            const updatedCrudDeleteOneSubState: CrudDeleteSubState = {
                ...oldCrudDeleteSubState,
                loading: false,
                loaded: true,
                error
            };

            const piece: CrudPieceState = {
                ...oldCrudPieceState,
                delete: updatedCrudDeleteOneSubState
            };

            return {
                ...state,
                [endpoint]: piece
            };
        }
    ),
    on(
        CrudInternalActions.Create,
        (state, { endpoint, one }): CrudReducerState => {
            const oldCrudPieceState: CrudPieceState = state[endpoint];

            const oldCrudCreateSubState: CrudCreateSubState = oldCrudPieceState.create;

            const updatedCrudCreateSubState: CrudCreateSubState = {
                ...oldCrudCreateSubState,
                loading: true,
                loaded: false,
                newItem: one
            };

            const piece: CrudPieceState = {
                ...oldCrudPieceState,
                create: updatedCrudCreateSubState
            };

            return {
                ...state,
                [endpoint]: piece
            };
        }
    ),
    on(
        CrudInternalActions.CreateSuccess,
        (state, { endpoint, one }): CrudReducerState => {
            const oldCrudPieceState: CrudPieceState = state[endpoint];

            const oldCrudCreateSubState: CrudCreateSubState = oldCrudPieceState.create;

            const updatedCrudCreateSubState: CrudCreateSubState = {
                ...oldCrudCreateSubState,
                loading: false,
                loaded: true,
                newItem: null,
                item: one
            };

            const piece: CrudPieceState = {
                ...oldCrudPieceState,
                create: updatedCrudCreateSubState
            };

            return {
                ...state,
                [endpoint]: piece
            };
        }
    ),
    on(
        CrudInternalActions.CreateFail,
        (state, { endpoint, error }): CrudReducerState => {
            const oldCrudPieceState: CrudPieceState = state[endpoint];

            const oldCrudCreateSubState: CrudCreateSubState = oldCrudPieceState.create;

            const updatedCrudCreateSubState: CrudCreateSubState = {
                ...oldCrudCreateSubState,
                loading: false,
                loaded: true,
                newItem: null,
                item: null,
                error
            };

            const piece: CrudPieceState = {
                ...oldCrudPieceState,
                create: updatedCrudCreateSubState
            };

            return {
                ...state,
                [endpoint]: piece
            };
        }
    )
);
