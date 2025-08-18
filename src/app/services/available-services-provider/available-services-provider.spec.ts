import { TestBed } from '@angular/core/testing';

import { AvailableServicesProvider } from './available-services-provider';

describe('AvailableServicesProvider', () => {
  let service: AvailableServicesProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableServicesProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
