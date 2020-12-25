import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-url-builder',
  templateUrl: './url-builder.component.html',
  styleUrls: ['./url-builder.component.scss'],
  providers:[FormService]
})
export class UrlBuilderComponent {

    get form(){
        return this.formService.form;
    }

    get tourForm(): FormGroup {
        return this.form.get('tour') as FormGroup;
    }
    
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formService: FormService
    ) {
        this.form.valueChanges.subscribe(v=> {
            this.router.navigate([], {
                queryParams:v,
            })
        });
    }

    resetDates(){
        this.form.get('tour.isDuration').reset(null);
        this.form.get('tour.duration').reset(null);
        this.form.get('tour.startDate').reset(null);
        this.form.get('tour.endDate').reset(null);
    }
}
