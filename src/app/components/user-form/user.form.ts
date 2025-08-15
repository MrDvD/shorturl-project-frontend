import { FormControl, FormGroup, Validators } from "@angular/forms";
import { isUser, Optional, User } from "../../common/types";

export type UserFormMode = 'login' | 'register';

export class UserForm extends FormGroup {
  private readonly mode: UserFormMode;

  constructor(mode: UserFormMode) {
    const controls = {
      login: new FormControl<User['login']>(null,
        {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(3)],
        }
      ),
      password: new FormControl<User['password']>(null,
        {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(6)],
        }
      ),
    }
    if (mode === 'register') {
      controls['confirmPassword'] = new FormControl<User['password']>(null,
        {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(6)],
        }
      );
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
    const rawUser = this.getRawValue();
    if (this.valid && isUser(rawUser)) {
      return {
        login: rawUser.login,
        password: rawUser.password,
      };
    }
    return null;
  }
}