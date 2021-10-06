import { LinesLayer } from '../../../../src/layers/lines-layer';

describe('lines layer', () => {
  const layer = new LinesLayer({ source: { data: [] } });

  it('layer', () => {
    expect(layer).toBeDefined();
  });
});
