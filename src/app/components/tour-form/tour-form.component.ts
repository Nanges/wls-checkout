import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tour-form',
  templateUrl: './tour-form.component.html',
  styleUrls: ['./tour-form.component.scss']
})
export class TourFormComponent {

    @Input()
    form: FormGroup;

    disabled = true;

    constructor() { }

    click(){
        this.disabled = !this.disabled;
    }
}
