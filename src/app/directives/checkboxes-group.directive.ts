import { AfterContentInit, ContentChildren, Directive, forwardRef, QueryList } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { CheckboxDirective } from './checkbox.directive';

@Directive({
    selector: '[appCheckboxesGroup]',
    providers:[{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxesGroupDirective),
        multi: true
    }]
})
export class CheckboxesGroupDirective implements ControlValueAccessor, AfterContentInit{

    private onTouched: () => void;
    private onChange: (data: any[]) => void;
    private _values: any[];

    get values(){
        return this._values;
    }

    @ContentChildren(CheckboxDirective)
    checkboxes: QueryList<CheckboxDirective>

    constructor() { }
    ngAfterContentInit(): void {

        this.checkboxes.changes.pipe(
            startWith(this.checkboxes),
            tap(c => this.dispatchValues(c)),
            switchMap((e: QueryList<CheckboxDirective>) => 
                merge(...e.map(i => i.change$)).pipe(map(() => e))
            ),
            map(e => e.reduce(this.checkboxReducer, [])),
            tap(v => this.setValues(v)),
        ).subscribe();
    }

    writeValue(obj: any[]): void {
        this._values = obj;
        if(this.checkboxes){
            this.dispatchValues(this.checkboxes);
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.checkboxes.forEach(c => c.setDisabled(isDisabled));
    }

    private setValues(values: any[]){
        this._values = values;
        this.onChange(values);
    }

    private dispatchValues(checkboxes: QueryList<CheckboxDirective>){
        checkboxes.forEach(c => c.writeValue(this._values));
    }

    private checkboxReducer(result:any[], { checked, value }: CheckboxDirective){
        if(checked){
            result.push(value);
        }

        return result;
    }
}