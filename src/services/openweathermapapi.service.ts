import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { OpenweathermapApiGlobal } from '../models/openweathermapapi-global.model';

@Injectable()

export class OpenweathermapApiService {

    private baseUrl: string = 'http://api.openweathermap.org/data/2.5/';
    private source: string = 'toulouse';
    private apiKey: string = 'f2280845f042a572e50a80f884e2311a';

    constructor(private http: Http) {

    }

    public getWeather(): Promise<OpenweathermapApiGlobal> {
        const url = `${this.baseUrl}weather?q=${this.source},fr&appid=${this.apiKey}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as OpenweathermapApiGlobal)
            .catch(error => console.log('Une erreur est survenue' + error));

    }
}