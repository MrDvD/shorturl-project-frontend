import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from '../../components/user-info/user-info-component';
import { ToServicesComponent } from '../../components/to-services/to-services-component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-page-component',
  imports: [CommonModule, UserInfoComponent, ToServicesComponent],
  templateUrl: './account-page-component.html',
  styleUrl: './account-page-component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPageComponent {
  protected route = inject(ActivatedRoute);
  protected title = this.route.snapshot.data['title'];
}
