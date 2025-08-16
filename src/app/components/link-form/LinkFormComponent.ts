import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiGroup,
  TuiTextfield,
} from '@taiga-ui/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiBlock,
  TuiCheckbox,
  TuiCopy,
  TuiFieldErrorPipe,
  TuiInputDateTime,
  TuiTextarea,
} from '@taiga-ui/kit';
import { LinkForm } from './link.form';
import { TuiForm } from '@taiga-ui/layout';
import { TuiDay, TuiTime } from '@taiga-ui/cdk/date-time';
import { IgnoreDisabledValidators } from '../../directives/ignore-disabled-validators/IgnoreDisabledValidators';

@Component({
  selector: 'app-link-form-component',
  imports: [
    CommonModule,
    TuiError,
    TuiFieldErrorPipe,
    ReactiveFormsModule,
    TuiTextfield,
    TuiButton,
    TuiForm,
    TuiBlock,
    TuiGroup,
    TuiInputDateTime,
    FormsModule,
    TuiCheckbox,
    TuiAppearance,
    TuiTextarea,
    IgnoreDisabledValidators,
    TuiCopy,
  ],
  templateUrl: './LinkFormComponent.html',
  styleUrl: './LinkFormComponent.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkFormComponent {
  protected value: [TuiDay, TuiTime | null] | null = null;
  protected username = '?';
  protected linkForm = new LinkForm();
  protected resultLink = new FormControl<string | null>('some-result-link');
  protected isSent = false;

  public sendForm(): void {
    const link = this.linkForm.getLink();
    if (link) {
      this.isSent = true;
    } else {
      this.linkForm.markAllAsTouched();
    }
  }

  public newForm(): void {
    this.linkForm.reset();
    this.isSent = false;
  }

  public copyLink(): void {
    const link = this.resultLink.value;
    if (link) {
      navigator.clipboard.writeText(link);
    }
  }
}
