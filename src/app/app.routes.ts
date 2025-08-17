import { Route } from '@angular/router';
import { EnterPageComponent } from './pages/enter-page-component/EnterPageComponent';
import { GenerateLinkPageComponent } from './pages/generate-link-page-component/GenerateLinkPageComponent';
import { ListLinkPageComponent } from './pages/list-link-page-component/ListLinkPageComponent';
import { ServicesPageComponent } from './pages/services-page-component/ServicesPageComponent';
import { AccountPageComponent } from './pages/account-page-component/AccountPageComponent';

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
    path: 'list-url',
    component: ListLinkPageComponent,
    data: { title: 'Мои ссылки' },
  },
  {
    path: 'account',
    component: AccountPageComponent,
    data: { title: 'Мой аккаунт' },
  },
  {
    path: '',
    pathMatch: 'full',
    component: ServicesPageComponent,
    data: { title: 'Мои сервисы' },
  },
];
