import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexModule } from '@angular/flex-layout/flex';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { TourFormComponent } from './components/tour-form/tour-form.component';
import { RequiredDirective } from './directives/required.directive';
import { InitService } from './init.service';
import { Settings } from './models/settings';
import { QueryFormResolver } from './resolvers/query-form.resolver';
import { MaterialModule } from './shared/material/material.module';
import { MultiCheckboxesModule } from './shared/multi-checkboxes/multi-checkboxes.module';
import { WizardComponent } from './components/wizard/wizard.component';
import { TravelFormComponent } from './components/travel-form/travel-form.component';

@NgModule({
    declarations: [
        AppComponent,
        ContactFormComponent,
        TourFormComponent,
        RequiredDirective,
        WizardComponent,
        TravelFormComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        FlexModule,
        ReactiveFormsModule,
        MultiCheckboxesModule,
        HttpClientModule
    ],
    providers: [
        QueryFormResolver,
        {
            provide: APP_INITIALIZER,
            useFactory: InitService.initFactory,
            deps: [InitService],
            multi: true
        },
        {
            provide: Settings,
            useFactory: (initService) => initService.settings,
            deps: [InitService]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
