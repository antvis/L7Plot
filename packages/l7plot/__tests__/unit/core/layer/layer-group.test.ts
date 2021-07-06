import { PointLayerWrapper } from '../../../../src/layers/point-layer';
import { LayerGroup } from '../../../../src/core/layer/layer-group';
import { Source } from '../../../../src/types';

describe('layer group', () => {
  const layerGroup = new LayerGroup([]);

  it('layer', () => {
    const { layer } = new PointLayerWrapper({
      source: new Source([]),
      size: 12,
      color: '#fff',
      shape: 'circle',
    });

    layerGroup.addlayer(layer);

    expect(layerGroup.getLayer(layer.id)).toEqual(layer);

    expect(layerGroup.removelayer(layer)).toBeTruthy();

    layerGroup.addlayer(layer);

    expect(layerGroup.getLayerByName(layer.name)).toEqual(layer);

    expect(layerGroup.hasLayer(layer)).toBeTruthy();
  });

  it('getLayers', () => {
    expect(layerGroup.getLayers()).toEqual(layerGroup.layers);
  });

  it('removelayer', () => {
    layerGroup.removeAllLayer();
    expect(layerGroup.getLayers().length).toEqual(0);
  });
});
