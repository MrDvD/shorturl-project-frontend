import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkInfoComponent } from '../../components/link-info/link-info-component';
import { ActivatedRoute } from '@angular/router';
import { ToServicesComponent } from '../../components/to-services/to-services-component';
import { ServiceToken } from '../../services/tokens';
import { AuthService } from '../../services/auth-service/auth-service';
import { SortOptionComponent } from '../../components/sort-option/sort-option-component';
import { SortParams } from '../../components/sort-option/types.util';
import { map } from 'rxjs';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { TuiAlertService } from '@taiga-ui/core';

@Component({
  selector: 'app-list-link-page-component',
  imports: [
    CommonModule,
    LinkInfoComponent,
    ToServicesComponent,
    SortOptionComponent,
  ],
  templateUrl: './list-link-page-component.html',
  styleUrl: './list-link-page-component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListLinkPageComponent {
  private readonly linksService = inject(ServiceToken.LINK_SERVICE);
  private readonly route = inject(ActivatedRoute);
  private readonly authProvider = inject(AuthService);
  private readonly alertService = inject(TuiAlertService);
  protected title = this.route.snapshot.data['title'];
  private readonly sortParamsSubject = new BehaviorSubject<SortParams>({
    criteria: 'create_date',
    type: 'desc',
  });

  protected links$ = combineLatest([
    this.linksService.readAll(
      this.authProvider.getCurrentUser()?.item.login || ''
    ),
    this.sortParamsSubject,
  ]).pipe(
    map(([links, { criteria, type: sortType }]) => {
      const type = sortType === 'asc' ? 1 : -1;
      return links.sort((a, b) => {
        if (!a.item[criteria] || !b.item[criteria]) {
          return -1;
        }
        if (a.item[criteria] < b.item[criteria]) return -1 * type;
        if (a.item[criteria] > b.item[criteria]) return 1 * type;
        return 0;
      });
    })
  );

  public receiveSortParams(params: SortParams) {
    this.sortParamsSubject.next(params);
  }
}
