import { TestBed } from '@angular/core/testing';

import { AvailableServicesProvider } from './available-services-provider';
import { AuthService } from '../auth-service/auth-service';

describe('AvailableServicesProvider', () => {
  let service: AvailableServicesProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvailableServicesProvider, AuthService],
    });
    service = TestBed.inject(AvailableServicesProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
