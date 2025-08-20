import { Observable } from 'rxjs';
import { UID } from '../common/types';

export interface GenericRepository<T, K extends keyof T = never> {
  create(item: T): Observable<UID<Omit<T, K>>>;
  update(
    item: UID<Omit<T, K> & Partial<Pick<T, K>>>
  ): Observable<UID<Omit<T, K>>>;
  delete(id: UID<T>['id']): Observable<void>;
}

export interface ReadableRepository<T, Selector, K extends keyof T = never>
  extends GenericRepository<T, K> {
  read(id: UID<T>['id']): Observable<UID<Omit<T, K>>>;
  readAll(selector: Selector): Observable<UID<Omit<T, K>>[]>;
}

export interface CheckableRepository<T, Response, K extends keyof T = never>
  extends GenericRepository<T, K> {
  check(item: T): Observable<Response>;
}
