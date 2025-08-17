import { TestBed } from '@angular/core/testing';

import { MockedVisitService } from './mocked-visit-service';

describe('MockedVisitService', () => {
  let service: MockedVisitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockedVisitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
