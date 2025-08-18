import { TestBed } from '@angular/core/testing';

import { AuthProvider } from './auth-provider';
import { ServiceToken } from '../tokens';
import { ApiUserService } from '../api-user-service/api-user-service';

describe('AuthProvider', () => {
  let service: AuthProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthProvider,
        { provide: ServiceToken.USER_SERVICE, useClass: ApiUserService },
      ],
    });
    service = TestBed.inject(AuthProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
