import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToServicesComponent } from '../../components/to-services/to-services-component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TuiAppearance, TuiSurface } from '@taiga-ui/core';
import { AvailableServicesProvider } from '../../services/available-services-provider/available-services-provider';

@Component({
  selector: 'app-services-page-component',
  imports: [
    CommonModule,
    ToServicesComponent,
    TuiAppearance,
    TuiCardLarge,
    RouterLink,
    TuiSurface,
  ],
  templateUrl: './services-page-component.html',
  styleUrl: './services-page-component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ServicesPageComponent {
  protected services = inject(AvailableServicesProvider);
  private route = inject(ActivatedRoute);

  protected title = this.route.snapshot.data['title'];
}
