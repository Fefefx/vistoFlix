import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Injector, Input } from '@angular/core';
import { ControlValueAccessorConnectorComponent } from './../ControlValueAccessorConnectorComponent';
import { Component } from '@angular/core';
import { CustomErrorStateMatcher } from 'src/app/core/utils/custom-error-state-matcher';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputPasswordComponent,
      multi: true
    }
  ]
})
export class InputPasswordComponent extends ControlValueAccessorConnectorComponent {

  @Input() label: string;
  matcher = new CustomErrorStateMatcher();
  hide = true;

  constructor(injector: Injector) {
    super(injector)
  }

}
