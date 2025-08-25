import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkFormComponent } from '../../components/link-form/link-form-component';
import { ToServicesComponent } from '../../components/to-services/to-services-component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generate-link-page-component',
  imports: [CommonModule, LinkFormComponent, ToServicesComponent],
  templateUrl: './generate-link-page-component.html',
  styleUrl: './generate-link-page-component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class GenerateLinkPageComponent {
  protected route = inject(ActivatedRoute);

  protected title = this.route.snapshot.data['title'];
}
