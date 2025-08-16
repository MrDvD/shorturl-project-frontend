import { Directive, inject, Input } from '@angular/core';
import { NgControl, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appIgnoreDisabledValidators]',
  standalone: true,
})
export class IgnoreDisabledValidators {
  private originalValidators: ValidatorFn | null = null;
  private readonly ngControl = inject(NgControl);

  @Input()
  set appIgnoreDisabledValidators(value: boolean) {
    if (value) {
      this.reset();
    } else {
      this.restore();
    }
  }

  private reset() {
    if (this.ngControl?.control) {
      this.originalValidators = this.ngControl.control.validator;
      this.ngControl.control.clearValidators();
      this.ngControl.control.updateValueAndValidity();
    }
  }

  private restore() {
    if (this.ngControl?.control && this.originalValidators) {
      this.ngControl.control.addValidators(this.originalValidators);
      this.ngControl.control.updateValueAndValidity();
    }
  }
}
