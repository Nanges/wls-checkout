import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { DisabledOption, Settings } from 'src/app/models/settings';

@Component({
  selector: 'app-travel-form',
  templateUrl: './travel-form.component.html',
  styleUrls: ['./travel-form.component.scss']
})
export class TravelFormComponent implements OnInit{

    @Input()
    form: FormGroup;

    get safariExperiments(){
        return (this.form.get('safariExperiment') as FormArray)
    }

    get hostingType(){
        return (this.form.get('hostingType') as FormControl);
    }

    private _safariExeperimentOptions$: Observable<DisabledOption[]>
    get safariExperimentOptions$(){
        return this._safariExeperimentOptions$;
    }

    get hostingTypeOptions(){
        return this.settings.data.hostingTypes;
    }

    get mealOptions(){
        return this.settings.data.meals;
    }

    get budgetPerPersonOptions(){
        return [2000, 2500, 3000 , 4000];
    }

    private _vehicleOptions$:Observable<DisabledOption[]>;
    get vehicleOptions$(){
        return this._vehicleOptions$;
    }


    constructor(private settings: Settings) {
    }

    ngOnInit(): void {
        this._safariExeperimentOptions$ = this.getSafariExperimentsOptions$();
        this._vehicleOptions$ = this.getVehicleOptions$();
    }

    private getVehicleOptions$(){
        const data = this.settings.data.vehicles;
        return this.hostingType.valueChanges.pipe(
            startWith(this.hostingType.value),
            tap(() => {
                // reset vehicle type control
                this.form.get('vehicleType').setValue(null);
            }),
            map(v => data.map(d => d.value !== 'suv' || ['luxury-lodge', 'guesthouse-lodge'].includes(v)
                        ? ({...d, disabled:false}) : ({...d, disabled:true})
            )));
    }

    private getSafariExperimentsOptions$(){
        const data = this.settings.data.safariExperiments;
        return this.safariExperiments.valueChanges.pipe(
            startWith(this.safariExperiments.value),
            map(v => data.map(d => v.indexOf(d.value) > -1 ? ({...d, disabled:true}) : ({...d, disabled:false})))
        );
    }
}
