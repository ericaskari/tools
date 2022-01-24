import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private httpClient: HttpClient) {}
    generate() {
        this.httpClient.post(`${environment.api}/codeGenerator`, {}).subscribe((d) => console.log(d));
    }
}
