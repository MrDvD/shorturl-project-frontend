import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToServicesComponent } from '../../components/to-services/to-services-component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TuiAppearance, TuiSurface } from '@taiga-ui/core';
import { AvailablePagesService } from '../../services/available-pages-service/available-pages-service';

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
  protected services = inject(AvailablePagesService);
  private route = inject(ActivatedRoute);

  protected title = this.route.snapshot.data['title'];
}
