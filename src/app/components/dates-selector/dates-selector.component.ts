import { Platform } from '@angular/cdk/platform';
import { Component, Inject, Injectable, Input, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { DateAdapter, ErrorStateMatcher, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { MatCalendarView, MatDatepicker } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        console.log(isSubmitted);
        return !!(control && control.invalid && (control.dirty || isSubmitted));
    }
}


@Injectable()
export class AppDateAdapter extends NativeDateAdapter {

    constructor(
        @Optional() @Inject(MAT_DATE_LOCALE) matDateLocale: string,
        platform: Platform,
        private selector: DatesSelectorComponent) {
        super(matDateLocale, platform);
    }

    format(date: Date, displayFormat: Object): string {
        return this.selector.useBase === true
            ? super.format(date, displayFormat)
            : `${date.getMonth() + 1}/${date.getFullYear()}`;
    }
}

@Component({
    selector: 'app-dates-selector',
    templateUrl: './dates-selector.component.html',
    styleUrls: ['./dates-selector.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: AppDateAdapter },
    ]
})
export class DatesSelectorComponent implements OnInit {

    @Input()
    isMobile: boolean;

    @Input()
    form: FormGroup;

    private _startView$: Observable<MatCalendarView>;
    get startView$(){
        return this._startView$;
    }

    private _startDate: FormControl;
    get startDate(){
        return this._startDate;
    }

    private _endDate: FormControl;
    get endDate(){
        return this._endDate;
    }

    private areExactDates: FormControl;
    get useBase(){
        return this.areExactDates?.value;
    }

    errorMatcher = new MyErrorStateMatcher();

    constructor() {}

    ngOnInit(): void {
        this.areExactDates = this.form.get('areExactDates') as FormControl;
        this._endDate = this.form.get('endDate') as FormControl;
        this._startDate = this.form.get('startDate') as FormControl;

        const areExactDates$ = this.areExactDates.valueChanges;
        this._startView$ = areExactDates$.pipe(
            startWith(this.areExactDates.value),
            map(v => v ? 'month': 'multi-year')
        );
    }

    chosenMonthHandler(e: Date, ctrl: FormControl, dp: MatDatepicker<any>){
        if(!this.areExactDates.value){
            const date = new Date(e.getFullYear(), e.getMonth());
            ctrl.setValue(date);
            dp.close();
        }
    }
}
