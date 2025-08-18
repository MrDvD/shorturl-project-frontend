import { TestBed } from '@angular/core/testing';

import { DomainProvider } from './domain-provider';

describe('DomainProvider', () => {
  let service: DomainProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomainProvider],
    });
    service = TestBed.inject(DomainProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
