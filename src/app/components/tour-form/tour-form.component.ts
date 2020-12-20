import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Settings } from 'src/app/models/settings';

@Component({
  selector: 'app-tour-form',
  templateUrl: './tour-form.component.html',
})
export class TourFormComponent {

    @Input()
    form: FormGroup;

    @Input()
    isMobile: boolean = true;

    get attendants(){
        return this.settings.data.attendants;
    }

    get tourTypes(){
        return this.settings.data.types;
    }

    get destinations(){
        return this.settings.data.destinations;
    }

    get safariExperiments(){
        return this.settings.data.safariExperiments;
    }

    constructor(private settings: Settings) {}
}
