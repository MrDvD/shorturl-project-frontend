import { Route } from '@angular/router';
import { EnterPageComponent } from './pages/enter-page-component/EnterPageComponent';
import { GenerateLinkPageComponent } from './pages/generate-link-page-component/GenerateLinkPageComponent';
import { ListLinkPageComponent } from './pages/list-link-page-component/ListLinkPageComponent';
import { ServicesPageComponent } from './pages/services-page-component/ServicesPageComponent';
import { AccountPageComponent } from './pages/account-page-component/AccountPageComponent';
import {
  canActivateGuestRouteGuard,
  canActivateUserRouteGuard,
} from './services/auth-provider/guards';
import { AuthProvider } from './services/auth-provider/auth-provider';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: EnterPageComponent,
    canActivate: [canActivateGuestRouteGuard],
    data: { mode: 'login' },
    providers: [
      AuthProvider,
    ],
  },
  {
    path: 'register',
    component: EnterPageComponent,
    canActivate: [canActivateGuestRouteGuard],
    data: { mode: 'register' },
    providers: [
      AuthProvider,
    ],
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
      AuthProvider,
    ],
    children: [
      {
        path: 'list-url',
        loadComponent: () => import('./pages/list-link-page-component/ListLinkPageComponent').then(
          (m) => m.ListLinkPageComponent
        ),
        data: { title: 'Мои ссылки' },
      },
      {
        path: 'account',
        loadComponent: () => import('./pages/account-page-component/AccountPageComponent').then(
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
