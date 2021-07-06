import { PolygonLayerWrapper } from '../../../../src/layers/polygon-layer';

describe('polygon layer', () => {
  const layerWrapper = new PolygonLayerWrapper();

  it('layerWrapper', () => {
    expect(layerWrapper).toBeDefined();
  });
});
