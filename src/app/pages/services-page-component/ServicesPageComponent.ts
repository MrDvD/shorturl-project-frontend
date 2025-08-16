import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToServicesComponent } from '../../components/to-services/ToServicesComponent';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TuiAppearance, TuiSurface } from '@taiga-ui/core';

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
  templateUrl: './ServicesPageComponent.html',
  styleUrl: './ServicesPageComponent.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ServicesPageComponent {
  protected route = inject(ActivatedRoute);

  protected title = this.route.snapshot.data['title'];
}
