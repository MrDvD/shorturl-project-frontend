import { Link } from '../../common/types';
import { HasMetadataPipe } from './has-metadata-pipe';

describe('HasMetadataPipe', () => {
  it('create an instance', () => {
    const pipe = new HasMetadataPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns true for links with metadata', () => {
    const pipe = new HasMetadataPipe();
    const linkWithMetadata: Link = {
      has_metadata: true,
      name: 'Test Link',
      description: 'Test Description',
      full_link: 'http://example.com',
      type: 'short',
      has_expire: false,
      create_date: new Date().toISOString(),
      owner: 'Test Owner',
    };

    expect(pipe.transform(linkWithMetadata)).toBe(true);
  });

  it('returns false for links without metadata', () => {
    const pipe = new HasMetadataPipe();
    const linkWithoutMetadata: Link = {
      has_metadata: false,
      name: 'Test Link',
      description: 'Test Description',
      full_link: 'http://example.com',
      type: 'short',
      has_expire: false,
      create_date: new Date().toISOString(),
      owner: 'Test Owner',
    };

    expect(pipe.transform(linkWithoutMetadata)).toBe(false);
  });
});
