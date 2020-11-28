import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
    exports:[
        MatStepperModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule
    ]
})
export class MaterialModule {}
