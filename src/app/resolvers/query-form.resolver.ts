import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FormService } from '../form.service';

@Injectable()
export class QueryFormResolver implements Resolve<any> {

    /**
     *
     */
    constructor(private formService: FormService) {
        
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const destinations = route.queryParamMap.get('destinations').split(',');
        this.formService.form.get('tour.destinations').setValue(destinations, { emitEvent: false });
        return;
    }
}