import { PolygonLayer } from '../../../../src/layers/polygon-layer';

describe('polygon layer', () => {
  const layer = new PolygonLayer({ source: { data: [] } });

  it('layer', () => {
    expect(layer).toBeDefined();
  });
});
