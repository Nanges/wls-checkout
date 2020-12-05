import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Settings } from './models/settings';

@Injectable({
  providedIn: 'root'
})
export class InitService {

    static initFactory(appInit: InitService){
        return () => appInit.init();
    }

    constructor(private http: HttpClient) {}

    init(){
        return this.http.get('./assets/config.json').pipe(
            tap(s => {
                this._settings = Object.assign(new Settings(), s);
            })
        ).toPromise()
    }

    private _settings: Settings;
    get settings(){
        return this._settings;
    }
}
