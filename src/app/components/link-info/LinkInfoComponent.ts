import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiCardLarge } from '@taiga-ui/layout';
import {
  TuiAppearance,
  TuiButton,
  TuiDataList,
  TuiDialogService,
  TuiDropdown,
  TuiTextfield,
} from '@taiga-ui/core';

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
  protected open = false;
  private readonly dialogs = inject(TuiDialogService);

  public copyLink(): void {
    navigator.clipboard.writeText(this.url);
  }

  public editLink(): void {
    this.dialogs.open('Hello!').subscribe();
  }
}
