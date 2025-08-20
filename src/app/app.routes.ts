import { Route } from '@angular/router';
import { EnterPageComponent } from './pages/enter-page-component/enter-page-component';
import { GenerateLinkPageComponent } from './pages/generate-link-page-component/generate-link-page-component';
import { ServicesPageComponent } from './pages/services-page-component/services-page-component';
import {
  canActivateGuestRouteGuard,
  canActivateUserRouteGuard,
} from './services/auth-service/guards';
import { AuthService } from './services/auth-service/auth-service';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: EnterPageComponent,
    canActivate: [canActivateGuestRouteGuard],
    data: { mode: 'login' },
    providers: [AuthService],
  },
  {
    path: 'register',
    component: EnterPageComponent,
    canActivate: [canActivateGuestRouteGuard],
    data: { mode: 'register' },
    providers: [AuthService],
  },
  {
    path: 'generate-url',
    component: GenerateLinkPageComponent,
    data: { title: 'Новая ссылка' },
  },
  {
    path: ':login',
    canActivate: [canActivateUserRouteGuard],
    providers: [AuthService],
    children: [
      {
        path: 'list-url',
        loadComponent: () =>
          import(
            './pages/list-link-page-component/list-link-page-component'
          ).then((m) => m.ListLinkPageComponent),
        data: { title: 'Мои ссылки' },
      },
      {
        path: 'account',
        loadComponent: () =>
          import('./pages/account-page-component/account-page-component').then(
            (m) => m.AccountPageComponent
          ),
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
