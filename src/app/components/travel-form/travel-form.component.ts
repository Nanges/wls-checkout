import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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

    private _safariExeperimentOptions$: Observable<DisabledOption[]>
    get safariExperimentOptions$(){
        return this._safariExeperimentOptions$;
    }

    constructor(private settings: Settings) {
    }

    ngOnInit(): void {
        this._safariExeperimentOptions$ = this.getSafariExperimentsOptions$();
    }

    private getSafariExperimentsOptions$(){
        const data = this.settings.data.safariExperiments;
        return this.safariExperiments.valueChanges.pipe(
            startWith(this.safariExperiments.value),
            map(v => data.map(d => v.indexOf(d.value) > -1 ? ({...d, disabled:true}) : ({...d, disabled:false})))
        );
    }
}
