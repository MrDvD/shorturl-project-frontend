import { TuiButton, TuiRoot } from '@taiga-ui/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceToken } from './services/tokens';
import { DomainService } from './services/domain-service/domain-service';
import { AuthService } from './services/auth-service/auth-service';
import { AvailablePagesService } from './services/available-pages-service/available-pages-service';
import { UID, User } from './common/types';
import { ApiUserService } from './services/api-user-service/api-user-service';
import { ApiLinkService } from './services/api-link-service/api-link-service';

@Component({
  imports: [RouterModule, TuiButton, TuiRoot],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.less',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AuthService,
    {
      provide: ServiceToken.LINK_SERVICE,
      useClass: ApiLinkService,
    },
    {
      provide: ServiceToken.USER_SERVICE,
      useClass: ApiUserService,
    },
    DomainService,
    AvailablePagesService,
  ],
})
export class App {
  private readonly authProvider = inject(AuthService);
  protected readonly user = this.authProvider.getCurrentUser();

  public getUser(): UID<Omit<User, 'password'>> {
    if (this.user) {
      return this.user;
    }
    throw new Error('User is not authenticated');
  }

  protected exit(): void {
    this.authProvider.clear();
  }
}
