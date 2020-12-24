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

        const isDuration = new FormControl(null);
        const startDate = new FormControl(null);
        const endDate = new FormControl({value: null, disabled: true});
        const duration = new FormControl({value: null, disabled: true}, Validators.min(1));

        isDuration.valueChanges.pipe(
            tap(v => {
                if(v){
                    duration.enable();
                    this.disableAndReset(endDate);
                }
                else{
                    endDate.enable();
                    this.disableAndReset(duration);
                }
            })
        ).subscribe();


        return this.fb.group({
            destinations: [null],
            safariExperiments: [null],
            tourType: [null],
            attendants: [null],
            isDuration,
            startDate,
            endDate,
            duration,
            hostingType: [null],
            mealType: [null],
            vehicleType: [null],
        })
    }

    private disableAndReset(control: AbstractControl){
        control.disable();
        control.reset(null, { emitEvent: false});
    }

    resetDates(){
        this.form.get('isDuration').reset(null);
        this.form.get('duration').reset(null);
        this.form.get('startDate').reset(null);
        this.form.get('endDate').reset(null);
    }
}
