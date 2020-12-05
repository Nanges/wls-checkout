import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormService } from './form.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    readonly isMobile$: Observable<any>;
    readonly form: FormGroup;

    get contactForm(){
        return this.form.get('contact') as FormGroup;
    }

    get tourForm(){
        return this.form.get('tour') as FormGroup;
    }

    /**
     *
     */
    constructor(private observer: MediaObserver, private formService: FormService) {
        this.isMobile$ = observer.asObservable().pipe(map(() => observer.isActive('lt-md')));
        this.form = this.formService.form;
    }
}
