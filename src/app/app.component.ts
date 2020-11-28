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

    get contactForm(){
        return this.formService.form.get('contact') as FormGroup;
    }

    /**
     *
     */
    constructor(private observer: MediaObserver, private formService: FormService) {
        this.isMobile$ = observer.asObservable().pipe(map(() => observer.isActive('lt-md')));
    }
}
