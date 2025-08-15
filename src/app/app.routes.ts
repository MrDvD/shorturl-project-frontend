import { Route } from '@angular/router';
import { EnterPageComponent } from './pages/enter-page-component/EnterPageComponent';

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
];
