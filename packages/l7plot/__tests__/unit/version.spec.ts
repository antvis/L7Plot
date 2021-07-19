import { version } from '../../src';
import pkg from '../../package.json';

describe('l7plot version', () => {
  it('should match the `version` field of package.json', () => {
    const expected = pkg.version;
    expect(version).toBe(expected);
  });
});
