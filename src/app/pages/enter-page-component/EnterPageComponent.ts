import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from '../../components/user-form/UserFormComponent';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enter-page-component',
  imports: [CommonModule, UserFormComponent],
  templateUrl: './EnterPageComponent.html',
  styleUrl: './EnterPageComponent.less',
})
export class EnterPageComponent {
  protected route = inject(ActivatedRoute);

  protected mode = this.route.snapshot.data['mode'];
}
