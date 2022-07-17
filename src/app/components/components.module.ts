import { MatIconModule } from '@angular/material/icon';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { CustomFormsModule } from '../forms/CustomForms.module';

@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    CustomFormsModule,
    MatIconModule,
    ErrorTailorModule
  ],
  exports: [
    LoginFormComponent,
    RegisterFormComponent
  ]
})
export class ComponentsModule { }
