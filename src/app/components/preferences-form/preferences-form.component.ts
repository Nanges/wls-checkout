import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DisabledOption, Settings } from 'src/app/models/settings';

@Component({
  selector: 'app-preferences-form',
  templateUrl: './preferences-form.component.html',
})
export class PreferencesFormComponent implements OnInit {

    @Input()
    form: FormGroup;

    get hostingTypeOptions(){
        return this.settings.data.hostingTypes;
    }

    get mealOptions(){
        return this.settings.data.meals;
    }

    get hostingType(){
        return (this.form.get('hostingType') as FormControl);
    }

    private _vehicleOptions$: Observable<DisabledOption[]>;
    get vehicleOptions$(){
        return this._vehicleOptions$;
    }

    constructor(private settings: Settings) {
    }

    ngOnInit(): void {
        this._vehicleOptions$ = this.getVehicleOptions$();
    }

    private getVehicleOptions$(){
        const data = this.settings.data.vehicles;
        return this.hostingType.valueChanges.pipe(
            startWith(this.hostingType.value),
            map(v => data.map(d => d.value !== 'suv' || ['luxury-lodge', 'guesthouse-lodge'].includes(v)
                        ? ({...d, disabled:false}) : ({...d, disabled:true})
            )));
    }
}
