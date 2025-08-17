import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from '../../components/user-info/UserInfoComponent';
import { ToServicesComponent } from '../../components/to-services/ToServicesComponent';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-page-component',
  imports: [CommonModule, UserInfoComponent, ToServicesComponent],
  templateUrl: './AccountPageComponent.html',
  styleUrl: './AccountPageComponent.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPageComponent {
  protected route = inject(ActivatedRoute);
  protected title = this.route.snapshot.data['title'];
}
