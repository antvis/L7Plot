import { version } from '../../src';
import pkg from '../../package.json';

describe('l7-composite-layers version', () => {
  it('should match the `version` field of package.json', () => {
    const expected = pkg.version;
    expect(version).toBe(expected);
  });
});
