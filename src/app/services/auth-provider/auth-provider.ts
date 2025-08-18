import { inject, Injectable } from '@angular/core';
import { Optional, UID, User } from '../../common/types';
import { ServiceToken } from '../tokens';

@Injectable()
export class AuthProvider {
  private readonly userService = inject(ServiceToken.USER_SERVICE);

  public getCurrentUser(): Optional<UID<Omit<User, 'password'>>> {
    return {
      id: 1,
      item: {
        login: 'testUser',
        email: 'test@example.com',
      },
    };
  }
}
