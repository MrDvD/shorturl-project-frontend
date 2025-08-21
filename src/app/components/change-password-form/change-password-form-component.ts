import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordForm } from './change-password.form';
import {
  TuiAlertService,
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiTextfield,
} from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { TuiForm } from '@taiga-ui/layout';
import { ServiceToken } from '../../services/tokens';
import { AuthService } from '../../services/auth-service/auth-service';
import { showSuccess } from '../../services/alerts';

@Component({
  selector: 'app-change-password-form-component',
  imports: [
    CommonModule,
    TuiTextfield,
    ReactiveFormsModule,
    TuiButton,
    TuiError,
    TuiFieldErrorPipe,
    TuiAppearance,
    TuiForm,
  ],
  templateUrl: './change-password-form-component.html',
  styleUrls: ['./change-password-form-component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordFormComponent {
  private readonly userService = inject(ServiceToken.USER_SERVICE);
  private readonly alertService = inject(TuiAlertService);
  private readonly authService = inject(AuthService);
  protected isOpened = output<boolean>();
  changePasswordForm = new ChangePasswordForm();

  public sendForm(): void {
    const newPassword = this.changePasswordForm.getPassword();
    if (newPassword) {
      const user = this.authService.getCurrentUser();
      if (!user) {
        throw new Error('User not found');
      }
      this.userService
        .update({
          ...user,
          item: {
            ...user.item,
            password: newPassword,
          },
        })
        .subscribe({
          next: () => {
            this.isOpened.emit(false);
            showSuccess(
              'Пароль успешно изменен',
              this.alertService
            ).subscribe();
          },
        });
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }
}
