import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthProvider } from './auth-provider';

export const canActivateUserRouteGuard: CanActivateFn = (
  snapshot: ActivatedRouteSnapshot
) => {
  const authProvider = inject(AuthProvider);
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
