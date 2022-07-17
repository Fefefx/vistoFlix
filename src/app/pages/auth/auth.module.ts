import { MatInputModule } from '@angular/material/input';
import { ComponentsModule } from './../../components/components.module';
import { AuthRoutingModule } from './auth.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ComponentsModule,
  ]
})
export class AuthModule { }
