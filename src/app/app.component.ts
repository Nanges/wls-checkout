import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'lio-checkout';

    readonly isMobile$: Observable<any>;

    /**
     *
     */
    constructor(private observer: MediaObserver) {
        this.isMobile$ = observer.asObservable().pipe(map(() => observer.isActive('lt-md')));
    }
}
