import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CrudEndpointsEnum } from '../../../enums/crud-endpoints.enum';
import { Pagination } from '../../../models/pagination.model';
import { CrudStoreModuleConfig, crudStoreModuleConfigInjectionToken } from '../crud-store.module.config';

export function paginationDefault(): Pagination {
    return {
        limit: 100,
        filter: '.',
        page: 0,
        sortKey: 'name',
        sortType: 1
    };
}

interface Crud {
    getAll<D>(endpoint: CrudEndpointsEnum, pagination: Pagination): Observable<{ count: number; results: D[] }>;
    getOne<D>(endpoint: CrudEndpointsEnum, id: string): Observable<D>;
    deleteOne(endpoint: CrudEndpointsEnum, id: string): Observable<void>;
    patchOne<D>(endpoint: CrudEndpointsEnum, id: string, patch: D): Observable<D>;
    create<D, Y extends string = 'id'>(endpoint: CrudEndpointsEnum, newOne: Omit<D, Y>): Observable<D>;
}

export function paginationParamBuilder(pagination: Pagination, httpParam: HttpParams = new HttpParams()): HttpParams {
    const limit = String(pagination.limit ?? 0);
    const page = String(pagination.page ?? 0);
    const sortKey = String(pagination.sortKey ?? 'name');
    const sortType = String(pagination.sortType ?? 0);
    const filter = String(pagination.filter ?? '.');
    return httpParam.set('limit', limit).set('page', page).set('sortKey', sortKey).set('sortType', sortType).set('filter', filter);
}

@Injectable({
    providedIn: 'root'
})
export class CrudService implements Crud {
    constructor(private httpClient: HttpClient, @Inject(crudStoreModuleConfigInjectionToken) public config: CrudStoreModuleConfig) {}

    getAll<D>(endpoint: CrudEndpointsEnum, pagination: Pagination): Observable<{ count: number; results: D[] }> {
        const options = {
            params: paginationParamBuilder(pagination)
        };

        return this.httpClient.get<{ count: number; results: D[] }>(`${this.config.environment.api}/${endpoint}`, options);
    }

    create<D, Y extends string = 'id'>(endpoint: CrudEndpointsEnum, newOne: Omit<D, Y>): Observable<D> {
        return this.httpClient.post<D>(`${this.config.environment.api}/${endpoint}`, newOne);
    }

    deleteOne(endpoint: CrudEndpointsEnum, id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.config.environment.api}/${endpoint}/${id}`);
    }

    getOne<D>(endpoint: CrudEndpointsEnum, id: string): Observable<any> {
        return this.httpClient.get<D>(`${this.config.environment.api}/${endpoint}/${id}`);
    }

    patchOne<D>(endpoint: CrudEndpointsEnum, id: string, patch: any): Observable<any> {
        return this.httpClient.patch<D>(`${this.config.environment.api}/${endpoint}/${id}`, patch);
    }
}
