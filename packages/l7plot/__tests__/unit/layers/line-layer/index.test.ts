import { LineLayerWrapper } from '../../../../src/layers/line-layer';

describe('line layer', () => {
  const layerWrapper = new LineLayerWrapper();

  it('layerWrapper', () => {
    expect(layerWrapper).toBeDefined();
  });
});
