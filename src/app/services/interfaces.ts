import { Observable } from 'rxjs';
import { UID } from '../common/types';

export interface GenericRepository<T, K extends keyof T = never> {
  create(item: T): Observable<UID<Omit<T, K>>>;
  update(item: UID<T>): Observable<UID<Omit<T, K>>>;
  delete(id: UID<T>['id']): Observable<void>;
}

export interface ReadableRepository<T, K extends keyof T = never>
  extends GenericRepository<T, K> {
  read(id: UID<T>['id']): Observable<UID<Omit<T, K>>>;
  readAll(): Observable<UID<Omit<T, K>>[]>;
}

export interface CheckableRepository<T, Response, K extends keyof T = never>
  extends GenericRepository<T, K> {
  check(item: T): Observable<Response>;
}
