import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { CAMPING, GUIDED_TOUR } from './constants';
import { Settings } from './models/settings';

@Injectable({
    providedIn: 'root'
})
export class FormService {

    readonly form: FormGroup;

    constructor(private fb: FormBuilder, private settings: Settings) { 
        this.form = this.createForm();
    }

    private get safariExperiments(){
        return this.settings.data.safariExperiments;
    }

    private createForm(){
        return this.fb.group({
            tour: this.createTourForm(),
            contact: this.createContactForm(),
            travel: this.createTravelForm()
        });
    }

    private createTourForm(){

        const type = new FormControl(null, Validators.required);
        const attendants = new FormControl({value:['guide'], disabled: true}, Validators.required);

        type.valueChanges.pipe(
            tap((v) => v === GUIDED_TOUR ? attendants.enable() : attendants.disable())
        ).subscribe();

        return this.fb.group({
            destinations:[null, Validators.required],
            type,
            attendants,
        });
    }

    private createContactForm(){
        const form =  this.fb.group({
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            country: [null, [Validators.required, this.validateCountry(this.settings.data.countries)]],
            mobile: [null, Validators.required],
            email: [null, [Validators.email, Validators.required]],
            adultNumber:[1, Validators.required],
            childrenNumber:[0, Validators.required],
            has4YearsKids:[{value: false, disabled: true}, Validators.required]
        });

        const has4YearsKids = form.get('has4YearsKids');

        form.get('childrenNumber')?.valueChanges.pipe(
            map(v => isNaN(+v) || v > 0 ? true : false),
            tap(e => e ? has4YearsKids?.enable() : has4YearsKids?.disable())
        ).subscribe();

        return form;
    }

    private createTravelForm(){
        const hostingType = new FormControl(null, Validators.required);
        const mealType = new FormControl(null, Validators.required);

        hostingType.valueChanges.pipe(
            tap(v => v === CAMPING ? mealType.disable(): mealType.enable())
        ).subscribe();

        return this.fb.group({
            hostingType,
            mealType,
            vehicleType: [null, Validators.required],
            budgetPerPerson: [null, Validators.required],
            safariExperiment: this.fb.array(
                this.safariExperiments.map(() => [null, Validators.required])
            ),
            safariExperiment2: [[this.safariExperiments[0]], Validators.required],
            travelDescription:[null]
        });
    }

    private validateCountry(countryList: any[]){
        return (control: AbstractControl) => countryList.includes(control.value) || !control.value ? null : ({ country: true });
    }
}
