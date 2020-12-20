import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || isSubmitted));
    }
}

@Component({
    selector: 'app-dates-selector',
    templateUrl: './dates-selector.component.html',
    styleUrls: ['./dates-selector.component.scss'],
})
export class DatesSelectorComponent implements OnInit {

    @Input()
    isMobile: boolean;

    @Input()
    form: FormGroup;

    private _startDate: FormControl;
    get startDate(){
        return this._startDate;
    }

    private _endDate: FormControl;
    get endDate(){
        return this._endDate;
    }

    private _duration: FormControl;
    get duration(){
        return this._duration;
    }

    errorMatcher = new MyErrorStateMatcher();

    constructor() {}

    ngOnInit(): void {
        this._endDate = this.form.get('endDate') as FormControl;
        this._startDate = this.form.get('startDate') as FormControl;
        this._duration = this.form.get('duration') as FormControl;
    }
}
