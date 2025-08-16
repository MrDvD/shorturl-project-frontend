import { Route } from '@angular/router';
import { EnterPageComponent } from './pages/enter-page-component/EnterPageComponent';
import { GenerateLinkPageComponent } from './pages/generate-link-page-component/GenerateLinkPageComponent';

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
];
