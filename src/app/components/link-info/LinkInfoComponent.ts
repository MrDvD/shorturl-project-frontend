import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiCardLarge } from '@taiga-ui/layout';
import {
  TuiAppearance,
  TuiButton,
  TuiDataList,
  TuiDialog,
  TuiDropdown,
  TuiTextfield,
} from '@taiga-ui/core';
import { LinkFormComponent } from '../link-form/LinkFormComponent';
import { EditLinkForm } from '../../directives/edit-link-form/EditLinkForm';

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
  ],
  templateUrl: './LinkInfoComponent.html',
  styleUrl: './LinkInfoComponent.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkInfoComponent {
  @Input() name = 'Сокращенная ссылка';
  @Input() description: string | null = '';
  @Input({ required: true }) url = '';
  @Input({ required: true }) creationDate = '';
  @Input() lastUpdatedDate = '';
  protected isMenuOpened = false;
  protected isEditOpened = false;

  public copyLink(): void {
    navigator.clipboard.writeText(this.url);
  }

  public editLink(): void {
    this.isEditOpened = true;
  }
}
