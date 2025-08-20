import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
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
import { ServiceToken } from '../../services/tokens';
import { take } from 'rxjs';
import { FormatLinkPipe } from '../../pipes/format-link/format-link-pipe';
import { TakeValidators } from '../../directives/take-validators/edit-link-form-directive';
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
  templateUrl: './link-form-component.html',
  styleUrl: './link-form-component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class LinkFormComponent implements OnInit {
  protected linkForm = new LinkForm();
  protected resultLink = new FormControl<string | null>('');
  protected formAppearance = 'floating';
  private readonly linkService = inject(ServiceToken.LINK_SERVICE);
  private readonly authProvider = inject(AuthProvider);
  private readonly user = this.authProvider.getCurrentUser();
  private readonly formatLink = new FormatLinkPipe();
  protected readonly domain = inject(DomainProvider).getApiDomain();
  sendMethod: 'POST' | 'PUT' = 'POST';
  link_id: number | null = null;
  protected isSent = signal(false);

  ngOnInit(): void {
    this.newForm();
  }

  public getUser(): UID<Omit<User, 'password'>> {
    if (this.user) {
      return this.user;
    }
    throw new Error('User not found');
  }

  public sendForm(): void {
    const link = this.linkForm.getLink();
    if (link) {
      const signedLink = {
        ...link,
        owner: this.user ? this.user.item.login : null,
      };
      switch (this.sendMethod) {
        case 'POST':
          this.linkService
            .create(signedLink)
            .pipe(take(1))
            .subscribe({
              next: (uid) => {
                this.resultLink.setValue(this.formatLink.transform(uid.item));
                this.isSent.set(true);
              },
              error: (error) => {
                console.error('Error creating link:', error);
              },
            });
          break;
        case 'PUT':
          if (this.link_id === null) {
            throw new Error('Link ID is not set for update');
          }
          this.linkService
            .update({ id: this.link_id, item: signedLink })
            .pipe(take(1))
            .subscribe({
              next: (uid) => {
                this.resultLink.setValue(this.formatLink.transform(uid.item));
                this.isSent.set(true);
              },
              error: (error) => {
                console.error('Error creating link:', error);
              },
            });
          break;
      }
    } else {
      this.linkForm.markAllAsTouched();
    }
  }

  public getLinkForm(): LinkForm {
    return this.linkForm;
  }

  public newForm(): void {
    if (this.user) {
      this.linkForm.reset();
    } else {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      this.linkForm.getType().disable();
      this.linkForm.getHasExpire().disable();
      this.linkForm.getExpire().disable();
      this.linkForm.patchValue({
        type: 'short',
        has_expire: true,
        // expire: TuiDay.fromLocalNativeDate(nextMonth),
      });
    }
    this.isSent.set(false);
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
