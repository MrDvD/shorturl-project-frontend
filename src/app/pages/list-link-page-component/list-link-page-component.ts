import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkInfoComponent } from '../../components/link-info/link-info-component';
import { ActivatedRoute } from '@angular/router';
import { ToServicesComponent } from '../../components/to-services/to-services-component';
import { TuiButton, TuiDataList, TuiDropdown } from '@taiga-ui/core';
import { ServiceToken } from '../../services/tokens';
import { AuthProvider } from '../../services/auth-provider/auth-provider';
import { tap } from 'rxjs/internal/operators/tap';

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
  templateUrl: './list-link-page-component.html',
  styleUrl: './list-link-page-component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListLinkPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly authProvider = inject(AuthProvider);
  protected title = this.route.snapshot.data['title'];
  protected isSortOpened = false;
  private linksService = inject(ServiceToken.LINK_SERVICE);
  protected links$ = this.linksService.readAll(this.authProvider.getCurrentUser()?.item.login || '');
}
