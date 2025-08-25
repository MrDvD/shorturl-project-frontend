import { FormControl } from '@angular/forms';

export class DecoratedFormControl<T> extends FormControl {
  private onChangeCallback = () => {
    // do nothing by default
  };

  public setOnChangeCallback(callback: () => void): void {
    this.onChangeCallback = callback;
  }

  override setValue(
    value: T,
    options?: { onlySelf?: boolean; emitEvent?: boolean }
  ): void {
    super.setValue(value, options);
    this.onChangeCallback();
  }

  override patchValue(
    value: T,
    options?: { onlySelf?: boolean; emitEvent?: boolean }
  ): void {
    super.patchValue(value, options);
    this.onChangeCallback();
  }

  override reset(
    value?: T,
    options?: { onlySelf?: boolean; emitEvent?: boolean }
  ): void {
    super.reset(value, options);
    this.onChangeCallback();
  }
}
