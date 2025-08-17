import { Injectable } from '@angular/core';
import { UID, User } from '../../common/types';
import { CrudWorker } from '../interfaces';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockedUserService implements CrudWorker<User, 'password'> {
  create(item: User): Observable<UID<User>> {
    return of({ id: 1, item });
  }

  read(id: UID<User>['id']): Observable<UID<Omit<User, 'password'>>> {
    return of({ id, item: { login: 'John Doe' } });
  }

  update(item: UID<User>): Observable<UID<Omit<User, 'password'>>> {
    return of({ ...item, item: { login: 'Updated Name' } });
  }

  delete(id: UID<User>['id']): Observable<void> {
    console.log(`User with id ${id} deleted`);
    return of();
  }
}
