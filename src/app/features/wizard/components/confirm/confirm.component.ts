import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

    @Input()
    form: FormGroup;

    private _rawValue:any;
    
    get contact(){
        return this._rawValue.contact;
    }

    get tour(){
        return this._rawValue.tour;
    }

    get preferences(){
        return this._rawValue.preferences;
    }

    constructor() { }

    ngOnInit(): void {
        this._rawValue = this.form.getRawValue();
    }
}
