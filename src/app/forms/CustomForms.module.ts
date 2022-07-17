import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputEmailComponent } from './input-email/input-email.component';
import { InputPasswordComponent } from './input-password/input-password.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    InputEmailComponent,
    InputPasswordComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    InputEmailComponent,
    InputPasswordComponent
  ]
})
export class CustomFormsModule { }
