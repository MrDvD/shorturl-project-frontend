import { Component, Input } from '@angular/core';
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
    console.log('Form submitted:', this.userForm.getUser());
  }
}
