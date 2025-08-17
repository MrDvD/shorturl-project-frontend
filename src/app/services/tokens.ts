import { InjectionToken } from '@angular/core';
import { CrudWorker, MassCrudWorker } from './interfaces';
import { Link, User } from '../common/types';

export const ServiceToken = {
  USER_SERVICE: new InjectionToken<CrudWorker<User>>('UserService'),
  LINK_SERVICE: new InjectionToken<MassCrudWorker<Link>>('LinkService'),
  // VISIT_SERVICE: new InjectionToken<CrudWorker<Visit>>('VisitService'),
};
