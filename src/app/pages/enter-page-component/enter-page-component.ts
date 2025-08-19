import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from '../../components/user-form/user-form-component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enter-page-component',
  imports: [CommonModule, UserFormComponent],
  templateUrl: './enter-page-component.html',
  styleUrl: './enter-page-component.less',
})
export class EnterPageComponent {
  protected route = inject(ActivatedRoute);

  protected mode = this.route.snapshot.data['mode'];
}
