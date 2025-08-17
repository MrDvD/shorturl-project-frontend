import { TestBed } from '@angular/core/testing';

import { MockedUserService } from './mocked-user-service';

describe('MockedUserService', () => {
  let service: MockedUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockedUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
