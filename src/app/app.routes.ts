import { Route } from '@angular/router';
import { EnterPageComponent } from './pages/enter-page-component/EnterPageComponent';
import { GenerateLinkPageComponent } from './pages/generate-link-page-component/GenerateLinkPageComponent';
import { ListLinkPageComponent } from './pages/list-link-page-component/ListLinkPageComponent';
import { ServicesPageComponent } from './pages/services-page-component/ServicesPageComponent';
import { AccountPageComponent } from './pages/account-page-component/AccountPageComponent';
import { canActivateUserRouteGuard } from './services/auth-provider/guards';
import { AuthProvider } from './services/auth-provider/auth-provider';
import { ServiceToken } from './services/tokens';
import { MockedUserService } from './services/mocked-user-service/mocked-user-service';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: EnterPageComponent,
    data: { mode: 'login' },
  },
  {
    path: 'register',
    component: EnterPageComponent,
    data: { mode: 'register' },
  },
  {
    path: 'generate-url',
    component: GenerateLinkPageComponent,
    data: { title: 'Новая ссылка' },
  },
  {
    path: ':login',
    canActivate: [canActivateUserRouteGuard],
    providers: [
      {
        provide: AuthProvider,
        useClass: AuthProvider,
      },
      {
        provide: ServiceToken.USER_SERVICE,
        useClass: MockedUserService,
      },
    ],
    children: [
      {
        path: 'list-url',
        component: ListLinkPageComponent,
        data: { title: 'Мои ссылки' },
      },
      {
        path: 'account',
        component: AccountPageComponent,
        data: { title: 'Мой аккаунт' },
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    component: ServicesPageComponent,
    data: { title: 'Доступные сервисы' },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
