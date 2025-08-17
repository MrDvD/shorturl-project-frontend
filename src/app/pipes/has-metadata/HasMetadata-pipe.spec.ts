import { HasMetadataPipe } from './HasMetadata-pipe';

describe('HasMetadataPipe', () => {
  it('create an instance', () => {
    const pipe = new HasMetadataPipe();
    expect(pipe).toBeTruthy();
  });
});
