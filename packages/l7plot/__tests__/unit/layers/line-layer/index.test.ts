import { LineLayer } from '../../../../src/layers/line-layer';

describe('line layer', () => {
  const layer = new LineLayer({ source: { data: [] } });

  it('layer', () => {
    expect(layer).toBeDefined();
  });
});
