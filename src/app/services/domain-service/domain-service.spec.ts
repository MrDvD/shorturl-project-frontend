import { TestBed } from '@angular/core/testing';

import { DomainService } from './domain-service';

describe('DomainProvider', () => {
  let service: DomainService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomainService],
    });
    service = TestBed.inject(DomainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
