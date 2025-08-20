import { inject, Injectable } from '@angular/core';
import { CheckableRepository } from '../interfaces';
import { UID, User } from '../../common/types';
import { Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomainProvider } from '../domain-provider/domain-provider';

@Injectable()
export class ApiUserService
  implements CheckableRepository<User, Response, 'password'>
{
  private readonly http = inject(HttpClient);
  private readonly domainProvider = inject(DomainProvider);

  create(item: User): Observable<UID<Omit<User, 'password'>>> {
    return this.http
      .post<UID<Omit<User, 'password'>>>(
        `${this.domainProvider.getApiDomain()}/register`,
        item,
        { withCredentials: true }
      )
      .pipe(take(1));
  }

  check(item: User): Observable<Response> {
    return this.http
      .post<Response>(`${this.domainProvider.getApiDomain()}/login`, item, {
        withCredentials: true,
      })
      .pipe(take(1));
  }

  update(
    item: UID<Omit<User, 'password'> & Partial<Pick<User, 'password'>>>
  ): Observable<UID<Omit<User, 'password'>>> {
    return this.http
      .put<UID<Omit<User, 'password'>>>(
        `${this.domainProvider.getApiDomain()}/users/${item.id}`,
        item,
        { withCredentials: true }
      )
      .pipe(take(1));
  }

  delete(id: UID<User>['id']): Observable<void> {
    return this.http
      .delete<void>(`${this.domainProvider.getApiDomain()}/users/${id}`, {
        withCredentials: true,
      })
      .pipe(take(1));
  }
}
