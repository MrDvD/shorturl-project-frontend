import { TestBed } from '@angular/core/testing';

import { AuthProvider } from './auth-provider';

describe('AuthProvider', () => {
  let service: AuthProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
