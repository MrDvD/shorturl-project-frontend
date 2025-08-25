import { Link } from '../../common/types';
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

  it('should format link with domain when type is short', () => {
    const expectedDomain = 'http://example.com/';
    jest
      .spyOn(TestBed.inject(DomainService), 'getApiDomain')
      .mockReturnValue(expectedDomain);
    const pipe = TestBed.inject(FormatLinkPipe);
    const link: Link = {
      full_link: 'test-url',
      type: 'short',
      short_id: 'v4Hj21',
      has_expire: false,
      has_metadata: false,
      create_date: new Date().toISOString(),
      owner: 'test-owner',
    };

    const result = pipe.transform(link, true);
    expect(result).toBe(expectedDomain + '/v1/' + link.short_id);
  });

  it('should format link with domain when type is named', () => {
    const expectedDomain = 'http://example.com/';
    jest
      .spyOn(TestBed.inject(DomainService), 'getApiDomain')
      .mockReturnValue(expectedDomain);
    const pipe = TestBed.inject(FormatLinkPipe);
    const link: Link = {
      full_link: 'named-url',
      type: 'named',
      short_id: 'lala',
      has_expire: false,
      has_metadata: false,
      create_date: new Date().toISOString(),
      owner: 'test-owner',
    };

    const result = pipe.transform(link, true);
    expect(result).toBe(
      expectedDomain + '/' + link.owner + '/' + link.short_id
    );
  });
});
