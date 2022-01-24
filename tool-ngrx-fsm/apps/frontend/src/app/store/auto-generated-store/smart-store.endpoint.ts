import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {UserModel} from "./types";

@Injectable()
export class SmartStoreEndpoint {
    constructor(private httpClient: HttpClient) {}

    getAll(data: any): Observable<UserModel[]> {
        return this.httpClient.get<UserModel[]>('');
    }
}
