import { InjectionToken } from '@angular/core';
import { Link, Response, User } from '../common/types';
import { CheckableRepository, ReadableRepository } from './interfaces';

export const ServiceToken = {
  USER_SERVICE: new InjectionToken<
    CheckableRepository<User, Response, 'password'>
  >('UserService'),
  LINK_SERVICE: new InjectionToken<ReadableRepository<Link, string>>(
    'LinkService'
  ),
};
