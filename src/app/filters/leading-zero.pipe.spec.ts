import { LeadingZeroPipe } from './leading-zero.pipe';

describe('LeadingZeroPipe', () => {
  it('create an instance', () => {
    const pipe = new LeadingZeroPipe();
    expect(pipe).toBeTruthy();
  });
});
