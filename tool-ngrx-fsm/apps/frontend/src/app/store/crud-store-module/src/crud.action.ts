import { createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

import { CrudEndpointsEnum } from '../../../enums/crud-endpoints.enum';
import { Pagination } from '../../../models/pagination.model';
import { RequestError } from '../../../models/request.error';

import { paginationDefault } from './crud.service';

export enum CrudActionCommands {
    GET = /*                */ '[CRUD] Get',
    GET_FAIL = /*           */ '[CRUD] Get Fail',
    GET_SUCCESS = /*        */ '[CRUD] Get Success',

    GET_BY_ID = /*          */ '[CRUD] Get by Id',
    GET_BY_ID_FAIL = /*     */ '[CRUD] Get by Id Fail',
    GET_BY_ID_SUCCESS = /*  */ '[CRUD] Get by Id Success',

    CREATE = /*             */ '[CRUD] Create',
    CREATE_FAIL = /*        */ '[CRUD] Create Fail',
    CREATE_SUCCESS = /*     */ '[CRUD] Create Success',

    UPDATE = /*             */ '[CRUD] Update',
    UPDATE_FAIL = /*        */ '[CRUD] Update Fail',
    UPDATE_SUCCESS = /*     */ '[CRUD] Update Success',

    DELETE = /*             */ '[CRUD] Delete',
    DELETE_FAIL = /*        */ '[CRUD] Delete Fail',
    DELETE_SUCCESS = /*     */ '[CRUD] Delete Success'
}

export class CrudInternalActions {
    public static Get = /*            */ createAction(CrudActionCommands.GET, props<{ endpoint: CrudEndpointsEnum; pagination: Pagination }>());

    public static GetFail = /*        */ createAction(CrudActionCommands.GET_FAIL, props<{ endpoint: CrudEndpointsEnum; error: RequestError }>());

    public static GetSuccess = /*     */ createAction(CrudActionCommands.GET_SUCCESS, props<{ endpoint: CrudEndpointsEnum; list: any[]; count: number }>());

    public static GetById = /*         */ createAction(CrudActionCommands.GET_BY_ID, props<{ endpoint: CrudEndpointsEnum; id: string }>());

    public static GetByIdFail = /*     */ createAction(CrudActionCommands.GET_BY_ID_FAIL, props<{ endpoint: CrudEndpointsEnum; error: RequestError }>());

    public static GetByIdSuccess = /*  */ createAction(CrudActionCommands.GET_BY_ID_SUCCESS, props<{ endpoint: CrudEndpointsEnum; one: any }>());

    public static Create = /*          */ createAction(CrudActionCommands.CREATE, props<{ endpoint: CrudEndpointsEnum; one: any }>());

    public static CreateFail = /*      */ createAction(CrudActionCommands.CREATE_FAIL, props<{ endpoint: CrudEndpointsEnum; error: RequestError }>());

    public static CreateSuccess = /*   */ createAction(CrudActionCommands.CREATE_SUCCESS, props<{ endpoint: CrudEndpointsEnum; one: any }>());

    public static Update = /*          */ createAction(CrudActionCommands.UPDATE, props<{ endpoint: CrudEndpointsEnum; id: string; one: any }>());

    public static UpdateFail = /*      */ createAction(CrudActionCommands.UPDATE_FAIL, props<{ endpoint: CrudEndpointsEnum; error: RequestError }>());

    public static UpdateSuccess = /*   */ createAction(CrudActionCommands.UPDATE_SUCCESS, props<{ endpoint: CrudEndpointsEnum; one: any }>());

    public static Delete = /*          */ createAction(CrudActionCommands.DELETE, props<{ endpoint: CrudEndpointsEnum; id: string }>());

    public static DeleteFail = /*      */ createAction(CrudActionCommands.DELETE_FAIL, props<{ endpoint: CrudEndpointsEnum; error: RequestError }>());

    public static DeleteSuccess = /*   */ createAction(CrudActionCommands.DELETE_SUCCESS, props<{ endpoint: CrudEndpointsEnum; id: string }>());
}

export class CrudAction<T = unknown, NEW_T = unknown> {
    constructor(private endpoint: CrudEndpointsEnum) {}

    public Get(pagination: Pagination = paginationDefault()): { endpoint: CrudEndpointsEnum; pagination: Pagination } & TypedAction<CrudActionCommands.GET> {
        return CrudInternalActions.Get({ endpoint: this.endpoint, pagination });
    }

    public GetById(id: string): { endpoint: CrudEndpointsEnum; id: string } & TypedAction<CrudActionCommands.GET_BY_ID> {
        return CrudInternalActions.GetById({ endpoint: this.endpoint, id });
    }

    public Create(one: NEW_T): { endpoint: CrudEndpointsEnum; one: NEW_T } & TypedAction<CrudActionCommands.CREATE> {
        return CrudInternalActions.Create({ endpoint: this.endpoint, one });
    }

    public Update(id: string, one: T): { endpoint: CrudEndpointsEnum; id: string; one: T } & TypedAction<CrudActionCommands.UPDATE> {
        return CrudInternalActions.Update({ endpoint: this.endpoint, one, id });
    }

    public Delete(id: string): { endpoint: CrudEndpointsEnum; id: string } & TypedAction<CrudActionCommands.DELETE> {
        return CrudInternalActions.Delete({ endpoint: this.endpoint, id });
    }
}
