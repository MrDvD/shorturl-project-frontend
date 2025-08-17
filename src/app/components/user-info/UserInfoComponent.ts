import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiAppearance, TuiButton, TuiTextfield } from '@taiga-ui/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiForm } from '@taiga-ui/layout';

@Component({
  selector: 'app-user-info-component',
  imports: [
    CommonModule,
    TuiTextfield,
    ReactiveFormsModule,
    TuiForm,
    TuiAppearance,
    TuiButton,
  ],
  templateUrl: './UserInfoComponent.html',
  styleUrl: './UserInfoComponent.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement> | null =
    null;
  protected email = new FormControl<string | null>({
    value: 'me@ya.ru',
    disabled: true,
  });
  protected login = 'testUser';

  public editEmail(): void {
    this.email.enable();
    this.emailInput?.nativeElement.focus();
  }
}
