import { TestBed } from '@angular/core/testing';

import { ApiUserService } from './api-user-service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DomainProvider } from '../domain-provider/domain-provider';
import { AuthProvider } from '../auth-provider/auth-provider';

describe('ApiUserService', () => {
  let service: ApiUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiUserService,
        provideHttpClient(),
        provideHttpClientTesting(),
        DomainProvider,
        AuthProvider,
      ],
    });
    service = TestBed.inject(ApiUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
