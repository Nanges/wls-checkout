import { Directive } from '@angular/core';
import { FormService } from 'src/app/form.service';
import { Settings } from 'src/app/models/settings';

@Directive({
    selector: '[appVehicleTypes]',
    exportAs: 'vehicleTypes'
})
export class VehicleTypesDirective {

    get items(){
        return this.settings.data.vehicles;
    }

    constructor(private settings: Settings, private formService: FormService) {
    }
}
