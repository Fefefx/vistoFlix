import { Component, Injector, Input, ViewChild } from "@angular/core";
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-base-input',
  template: ''
})
export class ControlValueAccessorConnectorComponent implements ControlValueAccessor {
  private controlDirective = new BehaviorSubject<FormControlDirective>(undefined);

  constructor(private injector: Injector) {}

  @ViewChild(FormControlDirective)
  set formControlDirective(value: FormControlDirective) {
    this.controlDirective.next(value);
  }

  @Input()
  formControl: FormControl;

  @Input()
  formControlName: string;

  get controlContainer() {
    return this.injector.get(ControlContainer);
  }

  get control() : FormControl {
    return this.formControl || (this.controlContainer.control.get(this.formControlName) as FormControl)
  }

  writeValue(obj: any): void {
    this.controlDirective.pipe(
      filter(formControl => {
        return formControl !== undefined;
      }),
      first()
    ).subscribe(formControl => {
      formControl.valueAccessor.writeValue(obj);
    });
  }

  registerOnChange(fn: any): void {
    this.controlDirective.pipe(
      filter(formControl => {
        return formControl !== undefined;
      }),
      first()
    ).subscribe(formControl => {
      formControl.valueAccessor.registerOnChange(fn);
    });
  }

  registerOnTouched(fn: any): void {
        this.controlDirective.pipe(
      filter(formControl => {
        return formControl !== undefined;
      }),
      first()
    ).subscribe(formControl => {
      formControl.valueAccessor.registerOnTouched(fn);
    });
  }

  setDisabledState(isDisabled: boolean): void {
    this.controlDirective.pipe(
      filter(formControl => {
        return formControl !== undefined;
      }),
      first()
    ).subscribe(formControl => {
      formControl.valueAccessor.setDisabledState(isDisabled);
    });
  }

};
