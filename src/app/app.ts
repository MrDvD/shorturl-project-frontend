import { TuiButton, TuiRoot } from '@taiga-ui/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceToken } from './services/tokens';
import { MockedLinkService } from './services/mocked-link-service/mocked-link-service';
import { DomainProvider } from './services/domain-provider/domain-provider';
import { AuthProvider } from './services/auth-provider/auth-provider';
import { AvailableServicesProvider } from './services/available-services-provider/available-services-provider';
import { UID, User } from './common/types';
import { ApiUserService } from './services/api-user-service/api-user-service';

@Component({
  imports: [RouterModule, TuiButton, TuiRoot],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.less',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AuthProvider,
    {
      provide: ServiceToken.LINK_SERVICE,
      useClass: MockedLinkService,
    },
    {
      provide: ServiceToken.USER_SERVICE,
      useClass: ApiUserService,
    },
    DomainProvider,
    AvailableServicesProvider,
  ],
})
export class App {
  private readonly authProvider = inject(AuthProvider);
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
