import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Optional, User } from '../../common/types';

export type UserFormMode = 'login' | 'register';

export class UserForm extends FormGroup {
  private readonly mode: UserFormMode;

  constructor(mode: UserFormMode) {
    let controls: {
      login: FormControl<User['login'] | null>;
      password: FormControl<User['password'] | null>;
      confirmPassword?: FormControl<User['password'] | null>;
    } = {
      login: new FormControl<User['login'] | null>(null, {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
      }),
      password: new FormControl<User['password'] | null>(null, {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)],
      }),
    };
    if (mode === 'register') {
      controls = {
        ...controls,
        confirmPassword: new FormControl<User['password'] | null>(null, {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(6)],
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
