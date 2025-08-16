import { Route } from '@angular/router';
import { EnterPageComponent } from './pages/enter-page-component/EnterPageComponent';
import { GenerateLinkPageComponent } from './pages/generate-link-page-component/GenerateLinkPageComponent';
import { ServicesPageComponent } from './pages/services-page-component/ServicesPageComponent';

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
    path: '',
    pathMatch: 'full',
    component: ServicesPageComponent,
    data: { title: 'Мои сервисы' },
  },
];
