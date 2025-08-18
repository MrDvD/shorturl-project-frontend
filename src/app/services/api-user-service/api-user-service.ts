import { inject, Injectable } from '@angular/core';
import { CheckableRepository } from '../interfaces';
import { UID, User } from '../../common/types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomainProvider } from '../domain-provider/domain-provider';

@Injectable()
export class ApiUserService
  implements CheckableRepository<User, Response, 'password'>
{
  private readonly http = inject(HttpClient);
  private readonly domainProvider = inject(DomainProvider);

  create(item: User): Observable<UID<Omit<User, 'password'>>> {
    return this.http.post<UID<Omit<User, 'password'>>>(
      `${this.domainProvider.getApiDomain()}/register`,
      item
    );
  }

  check(item: User): Observable<Response> {
    return this.http.post<Response>(
      `${this.domainProvider.getApiDomain()}/login`,
      item
    );
  }

  update(item: UID<User>): Observable<UID<Omit<User, 'password'>>> {
    return this.http.put<UID<Omit<User, 'password'>>>(
      `${this.domainProvider.getApiDomain()}/${item.id}`,
      item
    );
  }

  delete(id: UID<User>['id']): Observable<void> {
    return this.http.delete<void>(
      `${this.domainProvider.getApiDomain()}/users/${id}`
    );
  }
}
