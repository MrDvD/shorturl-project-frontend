import { Link, UID, User } from '../../common/types';
import { MassCrudWorker } from '../interfaces';
import { Observable, of } from 'rxjs';

export class MockedLinkService implements MassCrudWorker<Link> {
  private readonly login: User['login'];

  constructor(login: User['login']) {
    this.login = login;
  }

  create(item: Link): Observable<UID<Link>> {
    return of({ id: 1, item: item });
  }

  read(id: UID<Link>['id']): Observable<UID<Link>> {
    return of({
      id,
      item: {
        full_link: 'https://example.com',
        type: 'short',
        has_expire: false,
        has_metadata: false,
        owner: this.login,
        create_date: new Date(),
        update_date: new Date(),
      },
    });
  }

  readAll(): Observable<UID<Omit<Link, never>>[]> {
    return of([
      {
        id: 1,
        item: {
          full_link: 'https://example.com',
          type: 'short',
          has_expire: false,
          has_metadata: false,
          owner: this.login,
          create_date: new Date(),
          update_date: new Date(),
        },
      },
      {
        id: 2,
        item: {
          full_link: 'https://another-example.com',
          type: 'short',
          has_expire: false,
          has_metadata: false,
          owner: this.login,
          create_date: new Date(),
          update_date: new Date(),
        },
      },
    ]);
  }

  update(item: UID<Link>): Observable<UID<Link>> {
    return of({ ...item, item: { ...item.item, owner: this.login } });
  }

  delete(id: UID<Link>['id']): Observable<void> {
    console.log(`Link with id ${id} deleted`);
    return of();
  }
}
