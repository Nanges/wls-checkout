import { Component } from '@angular/core';
import { Settings2 } from './models/settings';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    /**
     *
     */
    constructor(setting: Settings2) {
        console.log(setting);
    }
}
