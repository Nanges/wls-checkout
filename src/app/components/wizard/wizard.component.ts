import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormService } from 'src/app/form.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent {

    readonly isMobile$: Observable<any>;
    readonly form: FormGroup;

    get contactForm(){
        return this.form.get('contact') as FormGroup;
    }

    get tourForm(){
        return this.form.get('tour') as FormGroup;
    }

    get travelForm(){
        return this.form.get('travel') as FormGroup;
    }

    /**
     *
     */
    constructor(
        observer: MediaObserver, 
        private formService: FormService,
    ) {
        this.isMobile$ = observer.asObservable().pipe(map(() => observer.isActive('lt-md')));
        this.form = this.formService.form;
    }
}
