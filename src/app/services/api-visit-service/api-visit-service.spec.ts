import { TestBed } from '@angular/core/testing';

import { ApiVisitService } from './api-visit-service';

describe('ApiVisitService', () => {
  let service: ApiVisitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiVisitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
