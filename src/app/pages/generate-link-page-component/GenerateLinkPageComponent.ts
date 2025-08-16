import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkFormComponent } from '../../components/link-form/LinkFormComponent';
import { ToServicesComponent } from '../../components/to-services/ToServicesComponent';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generate-link-page-component',
  imports: [CommonModule, LinkFormComponent, ToServicesComponent],
  templateUrl: './GenerateLinkPageComponent.html',
  styleUrl: './GenerateLinkPageComponent.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateLinkPageComponent {
  protected route = inject(ActivatedRoute);

  protected title = this.route.snapshot.data['title'];
}
