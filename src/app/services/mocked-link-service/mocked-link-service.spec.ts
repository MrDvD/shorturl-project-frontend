import { TestBed } from '@angular/core/testing';

import { MockedLinkService } from './mocked-link-service';
import { AuthProvider } from '../auth-provider/auth-provider';
import { MockedUserService } from '../mocked-user-service/mocked-user-service';
import { ServiceToken } from '../tokens';

describe('MockedLinkService', () => {
  let service: MockedLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockedLinkService,
        AuthProvider,
        { provide: ServiceToken.USER_SERVICE, useClass: MockedUserService },
        { provide: ServiceToken.LINK_SERVICE, useClass: MockedLinkService },
      ],
    });
    service = TestBed.inject(MockedLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
