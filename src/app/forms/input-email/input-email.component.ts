import { Injector, Input } from '@angular/core';
import { ControlValueAccessorConnectorComponent } from './../ControlValueAccessorConnectorComponent';
import { Component } from '@angular/core';
import { CustomErrorStateMatcher } from 'src/app/core/utils/custom-error-state-matcher';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-email',
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputEmailComponent,
      multi: true
    }
  ]
})
export class InputEmailComponent extends ControlValueAccessorConnectorComponent{

  @Input() label: string;

  matcher = new CustomErrorStateMatcher();

  constructor(injector: Injector) {
    super(injector);
  }

}
