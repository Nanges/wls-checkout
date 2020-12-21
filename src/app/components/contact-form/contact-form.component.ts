import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Settings } from 'src/app/models/settings';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {

    private _form: FormGroup;

    @Input()
    set form(f: FormGroup) {
        this._form = f;
    }

    get form(){
        return this._form;
    }


    get firstName(){
        return this._form.get('firstName') as FormControl;
    }

    get lastName(){
        return this._form.get('lastName') as FormControl;
    }

    get country(){
        return this._form.get('country') as FormControl;
    }

    get mobile(){
        return this._form.get('mobile') as FormControl;
    }

    get email() {
        return this._form.get('email') as FormControl;
    }

    get adultNumber(){
        return this._form.get('adultNumber') as FormControl;
    }

    get childrenNumber(){
        return this._form.get('childrenNumber') as FormControl;
    }

    get has4YearsKids() {
        return this._form.get('has4YearsKids') as FormControl;
    }

    readonly countries;

    readonly adultNumberOptions: (number|string)[];
    readonly childrenNumberOptions: (number|string)[];

    constructor(private settings: Settings) {
        this.adultNumberOptions = [...Array.from({length: 9}).map((_, i) => i + 1), '> 10'];
        this.childrenNumberOptions = [...Array.from({length: 10}).map((_, i) => i), '> 10'];
        this.countries = this.sortCountries();
    }

    private sortCountries(){
        const western = ['be','fr','lu','nl','de','ch','ca'];
        return this.settings.data.countries.sort((a, b) => {
            const iA = western.indexOf(a.value);
            const iB = western.indexOf(b.value);

            if(iA > -1 && iB === -1){
                return -1;
            }
            else if(iA > -1 && iB > -1){
                return iA < iB ? -1 : 1;
            }

            return a.label < b.label ? -1 : 1;
        });
    }
}
