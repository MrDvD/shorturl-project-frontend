import { DomainProvider } from '../../services/domain-provider/domain-provider';
import { FormatLinkPipe } from './FormatLink-pipe';

import { TestBed } from '@angular/core/testing';

describe('FormatLinkPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormatLinkPipe, DomainProvider],
    });
  });

  it('create an instance', () => {
    const pipe = TestBed.inject(FormatLinkPipe);
    expect(pipe).toBeTruthy();
  });
});
