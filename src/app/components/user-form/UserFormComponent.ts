import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiForm } from '@taiga-ui/layout';
import { TuiTextfield, TuiButton, TuiError } from '@taiga-ui/core';
import { UserForm, UserFormMode } from './user.form';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';

@Component({
  selector: 'app-user-form-component',
  imports: [CommonModule, TuiForm, ReactiveFormsModule, TuiTextfield, TuiButton, TuiError, TuiFieldErrorPipe],
  templateUrl: './UserFormComponent.html',
  styleUrl: './UserFormComponent.less',
})
export class UserFormComponent implements OnInit {
  @Input({ required: true }) userFormMode: UserFormMode;

  protected userForm: UserForm;

  ngOnInit(): void {
    this.userForm = new UserForm(this.userFormMode);
  }

  protected sendForm(): void {
    console.log('Form submitted:', this.userForm.getUser());
  }
}
