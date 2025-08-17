import { Directive, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { NgControl, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appTakeValidators]',
})
export class TakeValidators implements OnInit, OnDestroy {
  private readonly ngControl = inject(NgControl);
  @Input({ required: true }) validatorsMap: Record<string, ValidatorFn[]> = {};

  ngOnInit(): void {
    if (this.ngControl?.control && this.ngControl.name) {
      const name = this.ngControl.name;
      const validators = this.validatorsMap[name];
      this.ngControl.control.addValidators(validators);
      this.ngControl.control.updateValueAndValidity();
    }
  }

  ngOnDestroy(): void {
    if (this.ngControl?.control) {
      this.ngControl.control.clearValidators();
      this.ngControl.control.updateValueAndValidity();
    }
  }
}
