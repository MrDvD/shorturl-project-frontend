import { Observable } from 'rxjs';
import { UID } from '../common/types';

export interface CrudWorker<T, K extends keyof T = never> {
  create(item: T): Observable<UID<Omit<T, K>>>;
  read(id: UID<T>['id']): Observable<UID<Omit<T, K>>>;
  update(item: UID<T>): Observable<UID<Omit<T, K>>>;
  delete(id: UID<T>['id']): Observable<void>;
}

export interface MassCrudWorker<T, K extends keyof T = never>
  extends CrudWorker<T, K> {
  readAll(): Observable<UID<Omit<T, K>>[]>;
}
