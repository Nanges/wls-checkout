import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Settings } from 'src/app/models/settings';

@Component({
  selector: 'app-tour-form',
  templateUrl: './tour-form.component.html',
  styleUrls: ['./tour-form.component.scss']
})
export class TourFormComponent {

    @Input()
    form: FormGroup;

    get attendants(){
        return this.settings.data.attendants;
    }

    get types(){
        return this.settings.data.types;
    }

    get destinations(){
        return this.settings.data.destinations;
    }

    constructor(private settings: Settings) {}
}
