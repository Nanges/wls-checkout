import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ParamMap, Resolve, RouterStateSnapshot } from '@angular/router';
import { FormService } from '../form.service';

@Injectable()
export class QueryFormResolver implements Resolve<any> {

    /**
     *
     */
    constructor(private formService: FormService) {
        
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.resolveDestionations(route.queryParamMap)
        return;
    }

    private resolveDestionations(map: ParamMap){
        
    }
}