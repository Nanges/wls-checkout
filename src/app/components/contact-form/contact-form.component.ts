import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LabelledValue, Settings } from 'src/app/models/settings';

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
        this._countries$ = this.getCountriesObservable();
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

    private  _countries$: Observable<LabelledValue[]>;
    get countires$(){
        return this._countries$;
    }

    readonly adultNumberOptions: (number|string)[];
    readonly childrenNumberOptions: (number|string)[];

    constructor(private settings: Settings) {
        this.adultNumberOptions = [...Array.from({length: 9}).map((_, i) => i + 1), '> 10'];
        this.childrenNumberOptions = [...Array.from({length: 10}).map((_, i) => i), '> 10'];
    }

    private getCountriesObservable(): Observable<LabelledValue[]>{
        return this.country.valueChanges.pipe(
            map( v => typeof v === 'string' ? v : v.label),
            filter(v => v.length >= 2),
            map((v:string) => this.filterCountries(v)
        ));
    }

    private filterCountries(label: string){
        const filterLabel = label.toLowerCase();
        return this.settings.data.countries
            .filter(option => option.label
                .toLowerCase()
                .indexOf(filterLabel) === 0)
            .slice(0, 5);
    }

    displayFn(country: LabelledValue): string {
        return country && country.label ? country.label : '';
    }
}
