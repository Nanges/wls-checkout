import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Settings } from './models/settings';

@Injectable({
  providedIn: 'root'
})
export class InitService {

    static initFactory(appInit: InitService){
        return () => appInit.init();
    }

    constructor(
        @Inject(LOCALE_ID) private localeId:string,
        private http: HttpClient
    ) {}

    init(){
        return this.http.get(`./assets/config.json?locale=${this.localeId}`).pipe(
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
