import { Directive } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { CheckboxesGroupDirective } from './checkboxes-group.directive';

export type CheckboxValue = [boolean, any];

@Directive({
    selector: 'mat-checkbox[appCheckbox]',
})
export class CheckboxDirective {

    get change$(){
        return this.ref.change;
    }
    
    get checked(){
        return this.ref.checked;
    }

    get value(){
        return this.ref.value;
    }

    constructor(group:CheckboxesGroupDirective, private ref :MatCheckbox) {
        this.writeValue(group.values);
    }

    writeValue(obj: any[] = []): void {
        this.ref.checked = obj.includes(this.value);
    }

    registerOnTouched(fn: any): void {
        this.ref.registerOnTouched(fn);
    }

    setDisabled(disabled: boolean){
        this.ref.setDisabledState(disabled);
    }
}
