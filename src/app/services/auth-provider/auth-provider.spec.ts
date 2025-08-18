import { TestBed } from '@angular/core/testing';

import { AuthProvider } from './auth-provider';
import { MockedUserService } from '../mocked-user-service/mocked-user-service';
import { ServiceToken } from '../tokens';

describe('AuthProvider', () => {
  let service: AuthProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthProvider,
        { provide: ServiceToken.USER_SERVICE, useClass: MockedUserService },
      ],
    });
    service = TestBed.inject(AuthProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
