import { WasUpdatedPipe } from './was-updated-pipe';

describe('WasUpdatedPipe', () => {
  it('create an instance', () => {
    const pipe = new WasUpdatedPipe();
    expect(pipe).toBeTruthy();
  });

  // it('narrows down to links with update_date', () => {
  //   const pipe = new WasUpdatedPipe();
  //   const linkWithUpdateDate = { update_date: new Date() } as any;
  //   const linkWithoutUpdateDate = {} as any;

  //   // expect(pipe.transform(linkWithUpdateDate)).toBeTrue();
  //   // expect(pipe.transform(linkWithoutUpdateDate)).toBeFalse();
  // });
});
