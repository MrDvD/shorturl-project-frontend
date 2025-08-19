import { TestBed } from '@angular/core/testing';

import { AvailableServicesProvider } from './available-services-provider';
import { AuthProvider } from '../auth-provider/auth-provider';

describe('AvailableServicesProvider', () => {
  let service: AvailableServicesProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvailableServicesProvider, AuthProvider],
    });
    service = TestBed.inject(AvailableServicesProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
