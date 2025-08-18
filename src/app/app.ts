import { TuiButton, TuiRoot } from '@taiga-ui/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceToken } from './services/tokens';
import { MockedLinkService } from './services/mocked-link-service/mocked-link-service';
import { DomainProvider } from './services/domain-provider/domain-provider';
import { MockedUserService } from './services/mocked-user-service/mocked-user-service';
import { AuthProvider } from './services/auth-provider/auth-provider';

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
  ],
})
export class App {
  protected exit(): void {
    console.log('Exiting application...');
  }
}
