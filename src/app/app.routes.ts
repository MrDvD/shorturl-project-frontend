import { Route } from '@angular/router';
import { EnterPageComponent } from './pages/enter-page-component/enter-page-component';
import { GenerateLinkPageComponent } from './pages/generate-link-page-component/generate-link-page-component';
import { ListLinkPageComponent } from './pages/list-link-page-component/list-link-page-component';
import { ServicesPageComponent } from './pages/services-page-component/services-page-component';
import { AccountPageComponent } from './pages/account-page-component/account-page-component';
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
        loadComponent: () => import('./pages/list-link-page-component/list-link-page-component').then(
          (m) => m.ListLinkPageComponent
        ),
        data: { title: 'Мои ссылки' },
      },
      {
        path: 'account',
        loadComponent: () => import('./pages/account-page-component/account-page-component').then(
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
