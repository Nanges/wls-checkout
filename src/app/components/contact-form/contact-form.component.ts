import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {

    @Input()
    form: FormGroup;

    get firstName(){
        return this.form.get('firstName') as FormControl;
    }

    get lastName(){
        return this.form.get('lastName') as FormControl;
    }

    get country(){
        return this.form.get('country') as FormControl;
    }

    get mobile(){
        return this.form.get('mobile') as FormControl;
    }

    get email() {
        return this.form.get('email') as FormControl;
    }

    get adultNumber(){
        return this.form.get('adultNumber') as FormControl;
    }

    get childrenNumber(){
        return this.form.get('childrenNumber') as FormControl;
    }

    get has4YearsKids() {
        return this.form.get('has4YearsKids') as FormControl;
    }

    readonly countries: string[];
    readonly adultNumberOptions: (number|string)[];
    readonly childrenNumberOptions: (number|string)[];

    constructor() {
        this.countries = Array.from({length: 200}).map((_, i) => `Item #${i}`);
        this.adultNumberOptions = [...Array.from({length: 9}).map((_, i) => i + 1), '> 10'];
        this.childrenNumberOptions = [...Array.from({length: 10}).map((_, i) => i), '> 10'];
    }
}
