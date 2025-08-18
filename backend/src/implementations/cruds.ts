import postgres from 'postgres';
import { CheckableRepository } from '../abstracts/cruds';
import { RawUser, Response, UID, User } from '../abstracts/types';

export class UserRepository
  implements CheckableRepository<User, Response, 'password'>
{
  private sql: postgres.Sql;

  constructor(sql: postgres.Sql) {
    this.sql = sql;
  }

  protected mapUser(raw: RawUser): UID<Omit<User, 'password'>> {
    return {
      id: raw.user_id,
      item: {
        login: raw.login,
        email: raw.email,
      },
    };
  }

  public create(item: User): Promise<UID<Omit<User, 'password'>>> {
    if (item.email === undefined) {
      throw new Error('');
    }
    return this.sql<RawUser[]>`
      insert into USERS(login, email, password)
        values (${item.login}, ${item.email}, ${item.password})
        returning *;
    `
      .then((userList) => {
        if (userList[0]) {
          return this.mapUser(userList[0]);
        }
        throw new Error('Ошибка на стороне базы данных.');
      })
      .catch(() => {
        throw new Error('Пользователь уже существует.');
      });
  }

  public check(item: User): Promise<Response> {
    return this.sql<RawUser[]>`
      select * from USERS
        where login = ${item.login} and password = ${item.password};
    `
      .then((userList) => {
        if (userList[0]) {
          return { user: this.mapUser(userList[0]) };
        }
        throw new Error('Пользователь не существует.');
      })
      .catch(() => {
        throw new Error('Ошибка на стороне базы данных.');
      });
  }

  public update(item: UID<User>): Promise<UID<Omit<User, 'password'>>> {
    if (item.item.email) {
      return this.sql<RawUser[]>`
        update USERS
        set login = ${item.item.login}, email = ${item.item.email}, password = ${item.item.password}
        where user_id = ${item.id}
        returning *;
      `
        .then((userList) => {
          if (userList[0]) {
            return this.mapUser(userList[0]);
          }
          throw new Error('Ошибка на стороне базы данных.');
        })
        .catch(() => {
          throw new Error('Ошибка на стороне базы данных.');
        });
    } else {
      return this.sql<RawUser[]>`
        update USERS
        set login = ${item.item.login}, password = ${item.item.password}
        where user_id = ${item.id}
        returning *;
      `
        .then((userList) => {
          if (userList[0]) {
            return this.mapUser(userList[0]);
          }
          throw new Error('Ошибка на стороне базы данных.');
        })
        .catch(() => {
          throw new Error('Ошибка на стороне базы данных.');
        });
    }
  }

  public async delete(id: number): Promise<void> {
    await this.sql`
      delete from USERS
      where user_id = ${id};
    `;
  }
}
