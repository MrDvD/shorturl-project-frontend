import { DomainService } from '../../services/domain-service/domain-service';
import { FormatLinkPipe } from './format-link-pipe';

import { TestBed } from '@angular/core/testing';

describe('FormatLinkPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormatLinkPipe, DomainService],
    });
  });

  it('create an instance', () => {
    const pipe = TestBed.inject(FormatLinkPipe);
    expect(pipe).toBeTruthy();
  });
});
