import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Settings } from 'src/app/models/settings';

@Component({
  selector: 'app-travel-form',
  templateUrl: './travel-form.component.html',
  styleUrls: ['./travel-form.component.scss']
})
export class TravelFormComponent {

    @Input()
    form: FormGroup;

    get safariExperiments(){
        return this.settings.data.safariExperiments;
    }

    constructor(private settings: Settings) {
    }
}
