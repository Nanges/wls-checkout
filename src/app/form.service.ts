import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { CAMPING, GUIDED_TOUR, NO_SUV_HOSTING, SUV } from './constants';
import { Settings } from './models/settings';

@Injectable({
    providedIn: 'root'
})
export class FormService {

    readonly form: FormGroup;

    constructor(private fb: FormBuilder, private settings: Settings) { 
        this.form = this.createForm();
    }
    
    private createForm(){
        return this.fb.group({
            tour: this.createTourForm(),
            contact: this.createContactForm(),
            preferences: this.createPreferencesForm()
        });
    }

    private createTourForm(){
        const tour_type = new FormControl(null, Validators.required);
        const attendants = new FormControl({value:null, disabled: true}, Validators.required);
        const is_duration = new FormControl(null, Validators.required);
        const start_date = new FormControl(null, Validators.required);
        const end_date = new FormControl({value: null, disabled: true}, Validators.required);
        const duration = new FormControl({value: null, disabled: true}, [Validators.required, Validators.min(1)]);
        const destinations = new FormControl(null, Validators.required);
        const safari_experiments = new FormControl(null, Validators.required);
       
        tour_type.valueChanges.pipe(
            tap(v => this.tourTypeChange(v, attendants))
        ).subscribe();

        start_date.valueChanges.pipe(
            tap((d:Date) => {
                if(end_date.value && end_date.value < d){
                    end_date.reset(null);
                }
            })
        ).subscribe();

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
            destinations,
            safari_experiments,
            tour_type,
            attendants,
            is_duration,
            start_date,
            end_date,
            duration
        });
    }

    private createContactForm(){
        const form =  this.fb.group({
            title:[null, Validators.required],
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

    private createPreferencesForm(){
        const hosting_type = new FormControl(null, Validators.required);
        const meal_type = new FormControl({value:null, disabled: true}, Validators.required);
        const vehicle_type = new FormControl(null, Validators.required);

        hosting_type.valueChanges.pipe(
            tap(v => this.hostingTypeChange(v, meal_type, vehicle_type))
        ).subscribe();

        return this.fb.group({
            hosting_type,
            meal_type,
            vehicle_type,
            travelDescription:[null]
        });
    }

    private validateCountry(countryList: any[]){
        return (control: AbstractControl) => countryList.includes(control.value) || !control.value ? null : ({ country: true });
    }

    /**
     * 
     * @param value 
     * @param attendants 
     */
    private tourTypeChange(value: string, attendants: FormControl){
        if(value === GUIDED_TOUR) {
            attendants.enable();
            attendants.setValue(['guide']);
        }
        else{
            attendants.disable();
            attendants.setValue(null);
        }
    }

    /**
     * 
     * @param value 
     * @param mealType 
     */
    private hostingTypeChange(value: string, mealType: FormControl, vehicleType: FormControl){
        if(value === CAMPING) {
            mealType.disable();
            mealType.setValue(null);
        }
        else {
            mealType.enable();
        }

        if(NO_SUV_HOSTING.includes(value) && vehicleType.value === SUV){
            vehicleType.setValue(null);
        }
    }

    private disableAndReset(control: AbstractControl){
        control.disable();
        control.reset(null, { emitEvent: false});
    }
}
