import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth-service';
import { ServiceToken } from '../tokens';
import { ApiUserService } from '../api-user-service/api-user-service';

describe('AuthProvider', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: ServiceToken.USER_SERVICE, useClass: ApiUserService },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
