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
import { FormValidator } from '../../common/formValidators';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';

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
  templateUrl: './UserInfoComponent.html',
  styleUrl: './UserInfoComponent.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement> | null =
    null;
  private userService = inject(ServiceToken.USER_SERVICE);
  protected email = new FormControl<string | null>(
    {
      value: 'me@ya.ru',
      disabled: true,
    },
    [FormValidator.isEmail, FormValidator.required]
  );
  protected login = 'testUser';
  protected userId = 1;
  protected isRemoveOpened = false;
  protected previousEmail: string | null = null;
  protected isEditingEmail = false;

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
    if (this.email.valid) {
      // this.userService.update(null)
      console.log('Email updated:', this.email.value);
      this.previousEmail = this.email.value;
      this.resetEmail();
    } else {
      this.email.markAsTouched();
    }
  }

  public openRemoveDialog(): void {
    this.isRemoveOpened = true;
  }

  public removeUser(): void {
    this.userService.delete(this.userId).subscribe({
      complete: () => {
        console.log('User removed successfully');
        this.isRemoveOpened = false;
      },
      error: (error) => {
        console.error('Error removing user', error);
      },
    });
  }
}
