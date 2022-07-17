import { AuthSessionService } from './../../core/services/auth-session.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventParentToChildService } from 'src/app/core/services/event-parent-to-child.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  formGroup: FormGroup;
  submitted: boolean;
  invalidLogin = false;
  @Input() isLoginForm: boolean;

  constructor(private formBuilder: FormBuilder, private _auth: AuthSessionService, private _events: EventParentToChildService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get f() {
    return this.formGroup.controls;
  }

  async onSubmit() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.invalidLogin = false;
      return;
    }

    this.invalidLogin = await this._auth.login(this.f.email.value, this.f.password.value);

    this.submitted = false;
  }

  goToRegisterForm() {
    this._events.broadcast({ name: 'changeForm', value: false });
  }

}
