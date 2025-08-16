import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButton } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-to-services-component',
  imports: [CommonModule, TuiButton, RouterLink],
  templateUrl: './ToServicesComponent.html',
  styleUrl: './ToServicesComponent.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToServicesComponent {
  @Input({ required: true }) title = '';
  @Input() redirectUrl = '';
}
