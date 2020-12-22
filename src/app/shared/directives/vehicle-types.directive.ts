import { Directive } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormService } from 'src/app/form.service';
import { DisabledOption, Settings } from 'src/app/models/settings';

@Directive({
    selector: '[appVehicleTypes]',
    exportAs: 'vehicleTypes'
})
export class VehicleTypesDirective {

    readonly items$: Observable<DisabledOption[]>

    constructor(private settings: Settings, private formService: FormService) {
        this.items$ = this.createItems$();
    }
    
    private createItems$(){
        const hostingType = this.formService.form.get('preferences.hostingType') as FormControl
        const data = this.settings.data.vehicles;

        return hostingType.valueChanges.pipe(
            startWith(hostingType.value),
            map(v => data.map(d => d.value !== 'suv' || ['luxury-lodge', 'guesthouse-lodge'].includes(v)
                        ? ({...d, disabled:false}) : ({...d, disabled:true})
            )));
    }
}
