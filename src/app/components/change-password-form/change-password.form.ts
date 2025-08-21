import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../common/types';
import { FormValidator } from '../form-validators';

export class ChangePasswordForm extends FormGroup {
  constructor() {
    const password = new FormControl<User['password'] | null>(null, {
      nonNullable: true,
      validators: [FormValidator.required, FormValidator.minLength(6)],
    });
    super({
      password: password,
      confirmPassword: new FormControl<User['password'] | null>(null, {
        nonNullable: true,
        validators: [FormValidator.required, FormValidator.isEqual(password)],
      }),
    });
  }

  public getPassword(): User['password'] | null {
    return this.valid ? this.getRawValue().password : null;
  }

  public getTitle(): string {
    return 'Обновление пароля';
  }
}
