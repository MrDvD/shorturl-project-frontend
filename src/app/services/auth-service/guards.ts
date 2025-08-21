import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service';

export const canActivateUserRouteGuard: CanActivateFn = (
  snapshot: ActivatedRouteSnapshot
) => {
  const authProvider = inject(AuthService);
  const router = inject(Router);

  const loginParam = snapshot.paramMap.get('login');

  const user = authProvider.getCurrentUser();
  if (user !== null) {
    if (user.item.login === loginParam) {
      return true;
    }
    return router.parseUrl('/');
  }
  return router.parseUrl('/login');
};

export const canActivateGuestRouteGuard: CanActivateFn = () => {
  const authProvider = inject(AuthService);
  const router = inject(Router);

  const user = authProvider.getCurrentUser();
  if (user === null) {
    return true;
  }
  return router.parseUrl('/');
};
