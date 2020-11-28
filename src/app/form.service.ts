import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})
export class FormService {

    readonly form: FormGroup;

    constructor(private fb: FormBuilder) { 
        this.form = this.createForm();
    }

    private createForm(){
        const contact = this.createContactForm();

        return this.fb.group({
            contact
        });
    }

    private createContactForm(){
        const form =  this.fb.group({
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            country: [null, Validators.required],
            mobile: [null, Validators.required],
            email: [null, [Validators.email, Validators.required]],
            adultNumber:['1', Validators.required],
            childrenNumber:['0', Validators.required],
            has4YearsKids:[{value: false, disabled: true}, Validators.required]
        });

        const has4YearsKids = form.get('has4YearsKids');

        form.get('childrenNumber')?.valueChanges.pipe(
            map(v => isNaN(+v) || v > 0 ? true : false),
            tap(e => e ? has4YearsKids?.enable() : has4YearsKids?.disable())
        ).subscribe(console.log);

        return form;
    }
}
