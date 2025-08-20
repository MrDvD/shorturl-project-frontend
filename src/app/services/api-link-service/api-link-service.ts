import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DomainProvider } from '../domain-provider/domain-provider';
import { ReadableRepository } from '../interfaces';
import { Link, UID } from '../../common/types';
import { BehaviorSubject, map, Observable, take, tap } from 'rxjs';

@Injectable()
export class ApiLinkService implements ReadableRepository<Link, string> {
  private readonly http = inject(HttpClient);
  private readonly domainProvider = inject(DomainProvider);
  private readonly cachedLinks = new BehaviorSubject<UID<Link>[]>([]);

  read(id: number): Observable<UID<Link>> {
    return this.http
      .get<UID<Link>>(`${this.domainProvider.getApiDomain()}/v1/link/${id}`, {
        withCredentials: true,
      })
      .pipe(
        map((link) => ({
          ...link,
          item: {
            ...link.item,
            expire: link.item.expire ? link.item.expire : undefined,
            create_date: link.item.create_date,
            update_date: link.item.update_date
              ? link.item.update_date
              : undefined,
          },
        })),
        take(1)
      );
  }
  readAll(selector: string): Observable<UID<Link>[]> {
    this.http
      .get<UID<Link>[]>(
        `${this.domainProvider.getApiDomain()}/v1/${selector}/links`,
        {
          withCredentials: true,
        }
      )
      .pipe(
        map((links) =>
          links.map((link) => ({
            ...link,
            item: {
              ...link.item,
              expire: link.item.expire ? link.item.expire : undefined,
              create_date: link.item.create_date,
              update_date: link.item.update_date
                ? link.item.update_date
                : undefined,
            },
          }))
        ),
        take(1)
      )
      .subscribe((links) => {
        this.cachedLinks.next(links);
      });
    return this.cachedLinks;
  }
  create(item: Link): Observable<UID<Link>> {
    return this.http
      .post<UID<Link>>(
        `${this.domainProvider.getApiDomain()}/v1/generate-url`,
        item,
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap((newLink) => {
          this.cachedLinks.next([...this.cachedLinks.getValue(), newLink]);
        }),
        take(1)
      );
  }
  update(item: UID<Link>): Observable<UID<Link>> {
    return this.http
      .put<UID<Link>>(
        `${this.domainProvider.getApiDomain()}/v1/link/${item.id}/update`,
        item.item,
        {
          withCredentials: true,
        }
      )
      .pipe(
        map((link) => ({
          ...link,
          item: {
            ...link.item,
            expire: link.item.expire ? link.item.expire : undefined,
            create_date: link.item.create_date,
            update_date: link.item.update_date
              ? link.item.update_date
              : undefined,
          },
        })),
        tap((updatedLink) => {
          this.cachedLinks.next(
            this.cachedLinks
              .getValue()
              .map((link) => (link.id === updatedLink.id ? updatedLink : link))
          );
        }),
        take(1)
      );
  }
  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.domainProvider.getApiDomain()}/v1/remove-link`, {
        body: { id: id },
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.cachedLinks.next(
            this.cachedLinks.getValue().filter((link) => link.id !== id)
          );
        }),
        take(1)
      );
  }
}
