import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { ServiceToken } from '../../services/tokens';
import { take } from 'rxjs';
import { FormatLinkPipe } from '../../pipes/format-link/FormatLink-pipe';
import { TakeValidators } from '../../directives/take-validators/TakeValidators';
import { AuthProvider } from '../../services/auth-provider/auth-provider';
import { UID, User } from '../../common/types';
import { DomainProvider } from '../../services/domain-provider/domain-provider';

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
    TuiCopy,
    TakeValidators,
  ],
  templateUrl: './LinkFormComponent.html',
  styleUrl: './LinkFormComponent.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkFormComponent {
  protected value: [TuiDay, TuiTime | null] | null = null;
  protected linkForm = new LinkForm();
  protected resultLink = new FormControl<string | null>('');
  protected formAppearance = 'floating';
  private readonly linkService = inject(ServiceToken.LINK_SERVICE);
  private readonly authProvider = inject(AuthProvider);
  private readonly user = this.authProvider.getCurrentUser();
  private readonly formatLink = new FormatLinkPipe();
  protected readonly domain = inject(DomainProvider).getDomain();
  protected isSent = false;

  public getUser(): UID<Omit<User, 'password'>> {
    if (this.user) {
      return this.user;
    }
    throw new Error('User not found');
  }

  public sendForm(): void {
    const link = this.linkForm.getLink();
    if (link) {
      this.linkService
        .create(link)
        .pipe(take(1))
        .subscribe({
          next: (uid) => {
            this.resultLink.setValue(this.formatLink.transform(uid.item));
            this.isSent = true;
          },
          error: (error) => {
            console.error('Error creating link:', error);
          },
        });
    } else {
      this.linkForm.markAllAsTouched();
    }
  }

  public getLinkForm(): LinkForm {
    return this.linkForm;
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

  public setAppearance(value: string): void {
    this.formAppearance = value;
  }
}
