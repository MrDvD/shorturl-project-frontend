import { Injectable } from '@angular/core';
import { Response, UID, User } from '../../common/types';
import { Observable, of } from 'rxjs';
import { CheckableRepository } from '../interfaces';

@Injectable()
export class MockedUserService
  implements CheckableRepository<User, Response, 'password'>
{
  create(item: User): Observable<UID<User>> {
    return of({ id: 1, item });
  }

  check(item: User): Observable<Response> {
    console.log(`Checking user: ${item.login}`);
    return of({ status: 'success', data: null });
  }

  update(item: UID<User>): Observable<UID<Omit<User, 'password'>>> {
    return of({ ...item, item: { login: 'Updated Name' } });
  }

  delete(id: UID<User>['id']): Observable<void> {
    console.log(`User with id ${id} deleted`);
    return of();
  }
}
