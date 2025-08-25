import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiForm } from '@taiga-ui/layout';
import {
  TuiTextfield,
  TuiButton,
  TuiError,
  TuiAppearance,
  TuiAlertService,
} from '@taiga-ui/core';
import { UserForm, UserFormMode } from './user.form';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { RouterLink } from '@angular/router';
import { ServiceToken } from '../../services/tokens';
import { take } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth-service';
import { showError } from '../../services/alerts';
import { isErrorResponse } from '../../common/types';
import { HttpErrorResponse } from '@angular/common/http';

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
  templateUrl: './user-form-component.html',
  styleUrl: './user-form-component.less',
})
export class UserFormComponent {
  private readonly userService = inject(ServiceToken.USER_SERVICE);
  private readonly authProvider = inject(AuthService);
  private readonly alertService = inject(TuiAlertService);
  private _userFormMode: UserFormMode = 'login';

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
              error: (error: HttpErrorResponse) => {
                if (isErrorResponse(error.error)) {
                  showError(error.error, this.alertService).subscribe();
                } else {
                  showError(error, this.alertService).subscribe();
                }
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
              error: (error: HttpErrorResponse) => {
                if (isErrorResponse(error.error)) {
                  showError(error.error, this.alertService).subscribe();
                } else {
                  showError(error, this.alertService).subscribe();
                }
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
