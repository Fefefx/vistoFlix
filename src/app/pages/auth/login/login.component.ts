import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventParentToChildService } from 'src/app/core/services/event-parent-to-child.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  isLoginForm = true;

  constructor(private _events: EventParentToChildService) { }

  ngOnInit(): void {
    this._events.subscrible('changeForm', (params: { name: string, value: boolean }) => {
      this.isLoginForm = params.value;
    });
  }

}
