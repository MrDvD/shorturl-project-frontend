import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiForm } from '@taiga-ui/layout';
import {
  TuiTextfield,
  TuiButton,
  TuiError,
  TuiAppearance,
} from '@taiga-ui/core';
import { UserForm, UserFormMode } from './user.form';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { RouterLink } from '@angular/router';
import { ServiceToken } from '../../services/tokens';
import { take } from 'rxjs';
import { AuthProvider } from '../../services/auth-provider/auth-provider';

@Component({
  selector: 'app-user-form-component',
  imports: [
    CommonModule,
    TuiForm,
    ReactiveFormsModule,
    TuiTextfield,
    TuiButton,
    TuiError,
    TuiFieldErrorPipe,
    RouterLink,
    TuiAppearance,
  ],
  templateUrl: './UserFormComponent.html',
  styleUrl: './UserFormComponent.less',
})
export class UserFormComponent {
  private _userFormMode: UserFormMode = 'login';
  private readonly userService = inject(ServiceToken.USER_SERVICE);
  private readonly authProvider = inject(AuthProvider);

  @Input({ required: true })
  set userFormMode(value: UserFormMode) {
    this._userFormMode = value;
    this.userForm = new UserForm(this._userFormMode);
  }

  get userFormMode(): UserFormMode {
    return this._userFormMode;
  }

  protected userForm: UserForm = new UserForm(this._userFormMode);

  protected sendForm(): void {
    const user = this.userForm.getUser();
    if (user) {
      switch (this.userFormMode) {
        case 'register':
          this.userService
            .create(user)
            .pipe(take(1))
            .subscribe({
              next: (newUser) => {
                this.authProvider.setCurrentUser(newUser);
                window.location.href = '/';
              },
              error: (error) => {
                console.error(error.message);
              },
            });
          break;
        case 'login':
          this.userService
            .check(user)
            .pipe(take(1))
            .subscribe({
              next: (response) => {
                const newUser = response.user;
                this.authProvider.setCurrentUser(newUser);
                window.location.href = '/';
              },
              error: (error) => {
                console.error(error.message);
              },
            });
          break;
        default:
          console.error('UserFormComponent: Unsupported user form mode');
          return;
      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
