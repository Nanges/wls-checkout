import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WizardComponent } from './components/wizard/wizard.component';
import { QueryFormResolver } from './resolvers/query-form.resolver';

const routes: Routes = [
    {
        path:'**',
        resolve: [QueryFormResolver],
        component: WizardComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
