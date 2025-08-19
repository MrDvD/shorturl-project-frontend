import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DomainProvider } from '../domain-provider/domain-provider';
import { ReadableRepository } from '../interfaces';
import { Link, UID } from '../../common/types';
import { map, Observable } from 'rxjs';

@Injectable()
export class ApiLinkService implements ReadableRepository<Link, string> {
  private readonly http = inject(HttpClient);
  private readonly domainProvider = inject(DomainProvider);

  read(id: number): Observable<UID<Link>> {
    return this.http.get<UID<Link>>(
      `${this.domainProvider.getApiDomain()}/v1/link/${id}`,
      {
        withCredentials: true,
      }
    ).pipe(map(link => ({
      ...link,
      item: {
        ...link.item,
        expire: link.item.expire ? new Date(link.item.expire) : undefined,
        create_date: new Date(link.item.create_date),
        update_date: link.item.update_date ? new Date(link.item.update_date) : undefined,
      },
    })));
  }
  readAll(selector: string): Observable<UID<Link>[]> {
    return this.http.get<UID<Link>[]>(
      `${this.domainProvider.getApiDomain()}/v1/${selector}/links`,
      {
        withCredentials: true,
      }
    ).pipe(map(links => links.map(link => ({
      ...link,
      item: {
        ...link.item,
        expire: link.item.expire ? new Date(link.item.expire) : undefined,
        create_date: new Date(link.item.create_date),
        update_date: link.item.update_date ? new Date(link.item.update_date) : undefined,
      },
    }))));
  }
  create(item: Link): Observable<UID<Link>> {
    return this.http.post<UID<Link>>(
      `${this.domainProvider.getApiDomain()}/v1/generate-url`,
      item,
      {
        withCredentials: true,
      }
    );
  }
  update(item: UID<Link>): Observable<UID<Link>> {
    return this.http.put<UID<Link>>(
      `${this.domainProvider.getApiDomain()}/v1/link/${item.id}/update`,
      item.item,
      {
        withCredentials: true,
      }
    ).pipe(map(link => ({
      ...link,
      item: {
        ...link.item,
        expire: link.item.expire ? new Date(link.item.expire) : undefined,
        create_date: new Date(link.item.create_date),
        update_date: link.item.update_date ? new Date(link.item.update_date) : undefined,
      },
    })));
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.domainProvider.getApiDomain()}/v1/remove-link`,
      { body: { id: id }, withCredentials: true }
    );
  }
}
