import { Link } from '../../common/types';
import { WasUpdatedPipe } from './was-updated-pipe';

describe('WasUpdatedPipe', () => {
  it('create an instance', () => {
    const pipe = new WasUpdatedPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns true for links with update_date', () => {
    const pipe = new WasUpdatedPipe();
    const linkWithUpdateDate: Link = {
      full_link: 'https://example.com',
      type: 'short',
      has_expire: false,
      has_metadata: false,
      owner: null,
      create_date: new Date().toISOString(),
      update_date: new Date().toISOString(),
    };

    expect(pipe.transform(linkWithUpdateDate)).toBe(true);
  });

  it('returns false for links without update_date', () => {
    const pipe = new WasUpdatedPipe();
    const linkWithoutUpdateDate: Link = {
      full_link: 'https://example.com',
      type: 'short',
      has_expire: false,
      has_metadata: false,
      owner: null,
      create_date: new Date().toISOString(),
    };

    expect(pipe.transform(linkWithoutUpdateDate)).toBe(false);
  });
});
