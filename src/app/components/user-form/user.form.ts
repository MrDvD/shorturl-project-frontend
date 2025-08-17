import { FormControl, FormGroup } from '@angular/forms';
import { Optional, User } from '../../common/types';
import { FormValidator } from '../../common/formValidators';

export type UserFormMode = 'login' | 'register';

export class UserForm extends FormGroup {
  private readonly mode: UserFormMode;

  constructor(mode: UserFormMode) {
    let controls: {
      login: FormControl<User['login'] | null>;
      email?: FormControl<User['email'] | null>;
      password: FormControl<User['password'] | null>;
      confirmPassword?: FormControl<User['password'] | null>;
    } = {
      login: new FormControl<User['login'] | null>(null, {
        nonNullable: true,
        validators: [FormValidator.required, FormValidator.minLength(3)],
      }),
      password: new FormControl<User['password'] | null>(null, {
        nonNullable: true,
        validators: [FormValidator.required, FormValidator.minLength(6)],
      }),
    };
    if (mode === 'register') {
      controls = {
        ...controls,
        confirmPassword: new FormControl<User['password'] | null>(null, {
          nonNullable: true,
          validators: [
            FormValidator.required,
            FormValidator.isEqual(controls.password),
          ],
        }),
        email: new FormControl<User['email'] | null>(null, {
          nonNullable: true,
          validators: [FormValidator.isEmail, FormValidator.required],
        }),
      };
    }
    super(controls);
    this.mode = mode;
  }

  public getTitle(): string {
    switch (this.mode) {
      case 'login':
        return 'Вход';
      case 'register':
        return 'Регистрация';
      default:
        return 'Форма пользователя';
    }
  }

  public getUser(): Optional<User> {
    return this.valid ? this.getRawValue() : null;
  }
}
