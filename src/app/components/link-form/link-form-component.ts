import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiAlertService,
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
import { TakeValidators } from '../../directives/take-validators/take-validators-directive';
import { AuthService } from '../../services/auth-service/auth-service';
import { isErrorResponse, UID, User } from '../../common/types';
import { DomainService } from '../../services/domain-service/domain-service';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { HttpErrorResponse } from '@angular/common/http';
import { showError, showInfo } from '../../services/alerts';

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
  private readonly linkService = inject(ServiceToken.LINK_SERVICE);
  private readonly alertService = inject(TuiAlertService);
  private readonly user = inject(AuthService).getCurrentUser();
  protected readonly domain = inject(DomainService).getApiDomain();
  protected resultLink = new FormControl<string | null>('');
  protected readonly today = TuiDay.fromLocalNativeDate(new Date());
  private readonly formatLink = new FormatLinkPipe();
  protected isSent = signal(false);
  private linkForm: LinkForm | null = null;
  protected formAppearance = 'floating';
  sendMethod: 'POST' | 'PUT' = 'POST';
  link_id: number | null = null;

  ngOnInit(): void {
    if (!this.user) {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      this.linkForm = new LinkForm({
        type: 'short',
        has_expire: true,
        expire: [
          TuiDay.fromLocalNativeDate(nextMonth),
          TuiTime.fromLocalNativeDate(nextMonth),
        ],
        has_metadata: false,
      });
      this.getLinkForm().getType().disable();
      this.getLinkForm().getHasExpire().disable();
      this.getLinkForm().getExpire().disable();
      this.getLinkForm().getHasMetadata().disable();
    } else {
      this.linkForm = new LinkForm();
    }
    this.newForm();
  }

  public getUser(): UID<Omit<User, 'password'>> {
    if (this.user) {
      return this.user;
    }
    throw new Error('User not found');
  }

  public sendForm(): void {
    const link = this.getLinkForm().getLink();
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
              error: (error: HttpErrorResponse) => {
                if (isErrorResponse(error.error)) {
                  showError(error.error, this.alertService).subscribe();
                } else {
                  showError(error, this.alertService).subscribe();
                }
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
              error: (error: HttpErrorResponse) => {
                if (isErrorResponse(error.error)) {
                  showError(error.error, this.alertService).subscribe();
                } else {
                  showError(error, this.alertService).subscribe();
                }
              },
            });
          break;
      }
    } else {
      this.getLinkForm().markAllAsTouched();
    }
  }

  public getLinkForm(): LinkForm {
    if (this.linkForm) {
      return this.linkForm;
    }
    throw new Error('Link form is not initialized');
  }

  public newForm(): void {
    this.getLinkForm().reset();
    this.isSent.set(false);
  }

  public copyLink(): void {
    const link = this.resultLink.value;
    if (link) {
      navigator.clipboard.writeText(link);
      showInfo(
        'Ссылка скопирована в буфер обмена',
        this.alertService
      ).subscribe();
    }
  }

  public setAppearance(value: string): void {
    this.formAppearance = value;
  }
}
