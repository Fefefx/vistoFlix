import { UserRepositoryService } from './../../core/repositories/user-repository.service';
import { CustomValidators } from './../../forms/CustomValidators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventParentToChildService } from 'src/app/core/services/event-parent-to-child.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private _userRepository: UserRepositoryService, private _events: EventParentToChildService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    },{
      validators: CustomValidators.MatchValidator('password', 'confirmPassword')
    });
  }

  get f () {
    return this.formGroup.controls;
  }

  get passwordMatchError(){
    return (
      this.formGroup.getError('mismatch') &&
      this.formGroup.get('confirmPassword')?.touched
    )
  }

  backToLoginForm() {
    this._events.broadcast({ name: 'changeForm', value: true });
  }

  async onSubmit() {
    const checkUser = await this._userRepository.checkUser(this.f.email.value);
    if (checkUser) {
      Swal.fire('Usuário já cadastrado', 'Já um usuário cadastrado com o E-mail digitado', 'warning');
    } else {
      await this._userRepository.add({
        email:this.f.email.value,
        password: this.f.password.value
      });
      Swal.fire('Sucesso', 'Usuário criado com sucesso', 'success');
      this.backToLoginForm();
    }
  }
}

