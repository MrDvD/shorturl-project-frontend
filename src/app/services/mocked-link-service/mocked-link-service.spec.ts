import { TestBed } from '@angular/core/testing';

import { MockedLinkService } from './mocked-link-service';

describe('MockedLinkService', () => {
  let service: MockedLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockedLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
