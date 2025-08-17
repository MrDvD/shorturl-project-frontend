import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class FormValidator {
  public static required(field: AbstractControl): ValidationErrors | null {
    return field.value !== undefined && field.value !== null
      ? null
      : {
          other: 'Заполните это поле',
        };
  }

  public static isLink(field: AbstractControl): ValidationErrors | null {
    const value = field.value;
    const pattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w- ./?%&=]*)?$/;
    return pattern.test(value)
      ? null
      : {
          other: 'Введите корректную ссылку',
        };
  }

  public static isEmail(field: AbstractControl): ValidationErrors | null {
    const value = field.value;
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(value)
      ? null
      : {
          other: 'Введите корректный email',
        };
  }

  public static isEqual(field: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const isEqual = value === field.value;
      return isEqual ? null : { other: 'Поля не совпадают' };
    };
  }

  public static maxLength(max: number): ValidatorFn {
    return (field: AbstractControl): ValidationErrors | null => {
      const value = field.value;
      return value && value.length > max
        ? { other: `Длина не превышает ${max} символов` }
        : null;
    };
  }

  public static minLength(min: number): ValidatorFn {
    return (field: AbstractControl): ValidationErrors | null => {
      const value = field.value;
      return value && value.length < min
        ? { other: `Длина не менее ${min} символов` }
        : null;
    };
  }
}
