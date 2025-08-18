import { TuiButton, TuiRoot } from '@taiga-ui/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceToken } from './services/tokens';
import { MockedLinkService } from './services/mocked-link-service/mocked-link-service';
import { DomainProvider } from './services/domain-provider/domain-provider';
import { MockedUserService } from './services/mocked-user-service/mocked-user-service';
import { AuthProvider } from './services/auth-provider/auth-provider';
import { AvailableServicesProvider } from './services/available-services-provider/available-services-provider';
import { UID, User } from './common/types';

@Component({
  imports: [RouterModule, TuiButton, TuiRoot],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.less',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: AuthProvider,
      useClass: AuthProvider,
    },
    {
      provide: ServiceToken.LINK_SERVICE,
      useClass: MockedLinkService,
    },
    {
      provide: ServiceToken.USER_SERVICE,
      useClass: MockedUserService,
    },
    {
      provide: DomainProvider,
      useClass: DomainProvider,
    },
    {
      provide: AvailableServicesProvider,
      useClass: AvailableServicesProvider,
    },
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
    console.log('Exiting application...');
  }
}
