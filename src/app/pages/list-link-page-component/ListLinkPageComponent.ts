import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkInfoComponent } from '../../components/link-info/LinkInfoComponent';
import { ActivatedRoute } from '@angular/router';
import { ToServicesComponent } from '../../components/to-services/ToServicesComponent';
import { TuiButton, TuiDataList, TuiDropdown } from '@taiga-ui/core';
import { ServiceToken } from '../../services/tokens';

@Component({
  selector: 'app-list-link-page-component',
  imports: [
    CommonModule,
    LinkInfoComponent,
    ToServicesComponent,
    TuiButton,
    TuiDropdown,
    TuiDataList,
  ],
  templateUrl: './ListLinkPageComponent.html',
  styleUrl: './ListLinkPageComponent.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListLinkPageComponent {
  protected route = inject(ActivatedRoute);
  protected title = this.route.snapshot.data['title'];
  protected isSortOpened = false;
  private linksService = inject(ServiceToken.LINK_SERVICE);
  protected links$ = this.linksService.readAll();
}
