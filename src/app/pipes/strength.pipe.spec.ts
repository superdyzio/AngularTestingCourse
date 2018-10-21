import {StrengthPipe} from './strength.pipe';

describe('StrengthPipe', () => {
  let pipe: StrengthPipe;

  beforeEach(() => {
    pipe = new StrengthPipe();
  });

  it('should append (weak) if strength is 5', () => {
    expect(pipe.transform(5)).toEqual('5 (weak)');
  });

  it('should append (strong) if strength is 10', () => {
    expect(pipe.transform(10)).toEqual('10 (strong)');
  });

  it('should append (unbelievable) if strength is 20', () => {
    expect(pipe.transform(20)).toEqual('20 (unbelievable)');
  });
});
