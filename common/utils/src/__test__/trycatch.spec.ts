import { trycatch } from '../';

describe('Util Test', () => {
  test('Error build', async () => {
    const a = async (a: number, b: number): Promise<string> => {
      if (a < 0) throw new Error('a must be above 0');
      return String(a + b);
    };

    const res1 = await trycatch(a(1, 2));
    expect(res1.err).toBe(null);
    expect(res1.result).toBe('3');

    const res2 = await trycatch(a(-1, 2));
    expect(res2.err).not.toBe(null);
    expect(res2.result).toBe(null);
  });
});
