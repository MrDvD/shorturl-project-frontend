import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiAppearance,
  TuiButton,
  TuiDialog,
  TuiError,
  TuiTextfield,
} from '@taiga-ui/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiForm } from '@taiga-ui/layout';
import { ServiceToken } from '../../services/tokens';
import { FormValidator } from '../form-validators';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { UID, User } from '../../common/types';
import { AuthService } from '../../services/auth-service/auth-service';

@Component({
  selector: 'app-user-info-component',
  imports: [
    CommonModule,
    TuiTextfield,
    ReactiveFormsModule,
    TuiForm,
    TuiAppearance,
    TuiButton,
    TuiDialog,
    TuiError,
    TuiFieldErrorPipe,
  ],
  templateUrl: './user-info-component.html',
  styleUrl: './user-info-component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {
  private userService = inject(ServiceToken.USER_SERVICE);
  private authProvider = inject(AuthService);
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement> | null =
    null;
  private user: UID<Omit<User, 'password'>> | null = null;
  protected email = new FormControl<string | null>(
    {
      value: null,
      disabled: true,
    },
    [FormValidator.isEmail, FormValidator.required]
  );
  protected isRemoveOpened = false;
  protected previousEmail: string | null = null;
  protected isEditingEmail = false;

  constructor() {
    const user = this.authProvider.getCurrentUser();
    if (user) {
      this.user = user;
      if (user.item.email) {
        this.email.setValue(user.item.email);
      }
    }
  }

  public getUser(): UID<Omit<User, 'password'>> {
    if (this.user) {
      return this.user;
    }
    throw new Error('User not found');
  }

  public resetEmail(): void {
    this.email.disable();
    this.email.setValue(this.previousEmail);
    this.isEditingEmail = false;
  }

  public editEmail(): void {
    if (this.isEditingEmail) {
      this.updateEmail();
    } else {
      this.previousEmail = this.email.value;
      this.email.enable();
      this.emailInput?.nativeElement.focus();
      this.isEditingEmail = true;
    }
  }

  public updateEmail(): void {
    if (this.email.valid && this.email.value) {
      const newUser: UID<
        Omit<User, 'password'> & Partial<Pick<User, 'password'>>
      > = this.getUser();
      newUser.item.email = this.email.value;
      this.userService.update(newUser).subscribe({
        next: (updatedUser) => {
          console.log('hi yall');
          console.log('Email updated successfully:', updatedUser);
          this.authProvider.setCurrentUser(updatedUser);
          this.user = updatedUser;
          this.previousEmail = this.email.value;
          this.resetEmail();
        },
        error: (error) => {
          console.error('Error updating email:', error);
          this.email.setErrors({ serverError: 'Failed to update email' });
        },
      });
    } else {
      this.email.markAsTouched();
    }
  }

  public openRemoveDialog(): void {
    this.isRemoveOpened = true;
  }

  public removeUser(): void {
    if (this.user) {
      this.userService.delete(this.user.id).subscribe({
        complete: () => {
          this.isRemoveOpened = false;
          this.authProvider.clear();
          window.location.href = '/';
        },
        error: (error) => {
          console.error('Error removing user', error);
        },
      });
    } else {
      throw new Error('User is not provided');
    }
  }
}
