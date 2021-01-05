import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormService } from 'src/app/services/form.service';
import { FormUrlMapperHelper } from 'src/app/utils/form-url-mapper-helper';

@Component({
    selector: 'app-wizard',
    templateUrl: './wizard.component.html',
    styleUrls: ['./wizard.component.scss'],
    providers: [FormService],
})
export class WizardComponent {
    readonly isMobile$: Observable<any>;
    readonly form: FormGroup;

    get contactForm() {
        return this.form.get('contact') as FormGroup;
    }

    get tourForm() {
        return this.form.get('tour') as FormGroup;
    }

    get preferencesForm() {
        return this.form.get('preferences') as FormGroup;
    }

    /**
     *
     */
    constructor(
        observer: MediaObserver,
        private formService: FormService,
        private route: ActivatedRoute
    ) {
        this.isMobile$ = observer
            .asObservable()
            .pipe(map(() => observer.isActive('lt-md')));
        this.form = this.formService.form;

        FormUrlMapperHelper.mapToForm(
            this.form,
            route.snapshot.queryParamMap,
            true
        );

        this.form.patchValue({
            "tour": {
              "destinations": [
                "south-namibia",
                "central-northwestern-namibia"
              ],
              "safariExperiments": [
                "specific-activities"
              ],
              "tourType": "group",
              "attendants": null,
              "isDuration": 1,
              "startDate": "2021-01-14T23:00:00.000Z",
              "endDate": null,
              "duration": 15
            },
            "contact": {
              "title": "mr",
              "firstName": "Olivier",
              "lastName": "Lahaye",
              "country": "be",
              "mobile": "0479232313",
              "email": "laha.olivier@gmail.com",
              "adultNumber": 1,
              "childrenNumber": 0,
              "has4YearsKids": false
            },
            "preferences": {
              "hostingType": "camping-guesthouse-lodge",
              "mealType": "demi-pension",
              "vehicleType": "4x4-camping-equipment",
              "travelDescription": null
            }
          });
    }

    confirm(form) {
        console.log(form.value);
    }
}
