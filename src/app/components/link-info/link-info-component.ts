import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiCardLarge } from '@taiga-ui/layout';
import {
  TuiAlertService,
  TuiAppearance,
  TuiButton,
  TuiDataList,
  TuiDialog,
  TuiDropdown,
  TuiHint,
  TuiTextfield,
} from '@taiga-ui/core';
import { LinkFormComponent } from '../link-form/link-form-component';
import { EditLinkForm } from '../../directives/edit-link-form/edit-link-form-directive';
import { FormatDatePipe } from '../../pipes/format-date/format-date-pipe';
import { Link, UID } from '../../common/types';
import { WasUpdatedPipe } from '../../pipes/was-updated/was-updated-pipe';
import { FormatLinkPipe } from '../../pipes/format-link/format-link-pipe';
import { ServiceToken } from '../../services/tokens';
import { take } from 'rxjs';
import { showInfo, showSuccess } from '../../services/alerts';

@Component({
  selector: 'app-link-info-component',
  imports: [
    CommonModule,
    TuiCardLarge,
    TuiAppearance,
    TuiButton,
    TuiTextfield,
    TuiDropdown,
    TuiDataList,
    TuiDialog,
    LinkFormComponent,
    EditLinkForm,
    FormatDatePipe,
    WasUpdatedPipe,
    FormatLinkPipe,
    TuiHint,
  ],
  templateUrl: './link-info-component.html',
  styleUrl: './link-info-component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkInfoComponent {
  @Input({ required: true }) link: UID<Link> | null = null;
  private linkService = inject(ServiceToken.LINK_SERVICE);
  private alertService = inject(TuiAlertService);
  private formatLink = new FormatLinkPipe();
  protected isMenuOpened = false;
  protected isEditOpened = false;

  public copyShortLink(): void {
    if (this.link) {
      navigator.clipboard.writeText(this.formatLink.transform(this.link.item));
      showInfo(
        'Короткая ссылка скопирована в буфер обмена',
        this.alertService
      ).subscribe();
    }
  }

  public copyFullLink(): void {
    if (this.link) {
      navigator.clipboard.writeText(this.link.item.full_link);
      showInfo(
        'Полная ссылка скопирована в буфер обмена',
        this.alertService
      ).subscribe();
    }
  }

  public getLink(): UID<Link> {
    if (this.link) {
      return this.link;
    }
    throw new Error('Link is not provided');
  }

  public getLinkId(): UID<Link>['id'] {
    if (this.link) {
      return this.link.id;
    }
    throw new Error('Link ID is not provided');
  }

  public editLink(): void {
    this.isEditOpened = true;
  }

  public removeLink(): void {
    if (!this.link) {
      throw new Error('Link is not provided');
    }
    this.linkService
      .delete(this.link.id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          showSuccess('Ссылка успешно удалена', this.alertService).subscribe();
        },
        error: (error) => {
          console.error('Error removing link:', error);
        },
      });
  }

  public getLinkStatisticsUrl(): string {
    if (this.link) {
      return this.formatLink.transform(this.link.item, false) + '/info';
    }
    throw new Error('Link is not provided');
  }
}
