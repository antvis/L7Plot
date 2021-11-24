import { DotLayer } from '../../../../src/layers/dot-layer';
import { LayerGroup } from '../../../../src/core/layer/layer-group';
import { DotLayerOptions } from '../../../../src/layers/dot-layer';

describe('layer group', () => {
  const layerGroup = new LayerGroup([]);

  it('layer', () => {
    const layer = new DotLayer<DotLayerOptions>({
      source: { data: [], parser: { type: 'json', x: 'x', y: 'y' } },
      size: 12,
      color: '#fff',
      shape: 'circle',
    });

    layerGroup.addLayer(layer);

    expect(layerGroup.getLayer(layer.layer.id)).toEqual(layer);

    expect(layerGroup.removeLayer(layer)).toBeTruthy();

    expect(layerGroup.isEmpty()).toBeTruthy();

    layerGroup.addLayer(layer);

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
