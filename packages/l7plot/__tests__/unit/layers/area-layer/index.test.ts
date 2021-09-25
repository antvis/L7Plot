import { AreaLayer } from '../../../../src/layers/area-layer';

describe('area layer', () => {
  const layer = new AreaLayer({ source: { data: [] } });

  it('layer', () => {
    expect(layer).toBeDefined();
  });
});
