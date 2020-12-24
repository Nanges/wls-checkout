import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-url-builder',
  templateUrl: './url-builder.component.html',
  styleUrls: ['./url-builder.component.scss']
})
export class UrlBuilderComponent {

    readonly form: FormGroup;
    
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.form = this.createForm();
        this.form.valueChanges.subscribe(v=> {
            this.router.navigate([], {
                queryParams:v,
            })
        });

        const values = this.route.snapshot.queryParams;
        this.form.patchValue(values, {emitEvent: false});
    }

    private createForm(){

        const is_duration = new FormControl(null);
        const start_date = new FormControl(null);
        const end_date = new FormControl({value: null, disabled: true});
        const duration = new FormControl({value: null, disabled: true}, Validators.min(1));

        is_duration.valueChanges.pipe(
            tap(v => {
                if(v){
                    duration.enable();
                    this.disableAndReset(end_date);
                }
                else{
                    end_date.enable();
                    this.disableAndReset(duration);
                }
            })
        ).subscribe();


        return this.fb.group({
            destinations: [null],
            safari_experiments: [null],
            tour_type: [null],
            attendants: [null],
            is_duration,
            start_date,
            end_date,
            duration,
            hosting_type: [null],
            meal_type: [null],
            vehicle_type: [null],
        })
    }

    private disableAndReset(control: AbstractControl){
        control.disable();
        control.reset(null, { emitEvent: false});
    }

    resetDates(){
        this.form.get('is_duration').reset(null);
        this.form.get('duration').reset(null);
        this.form.get('start_date').reset(null);
        this.form.get('end_date').reset(null);
    }
}
