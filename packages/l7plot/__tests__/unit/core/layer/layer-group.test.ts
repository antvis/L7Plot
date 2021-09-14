import { DotLayer } from '../../../../src/layers/dot-layer';
import { LayerGroup } from '../../../../src/core/layer/layer-group';
import { Source } from '../../../../src/types';
import { IDotLayerOptions } from '../../../../src/layers/dot-layer/interface';

describe('layer group', () => {
  const layerGroup = new LayerGroup([]);

  it('layer', () => {
    const layer = new DotLayer<IDotLayerOptions>({
      source: new Source([], { parser: { type: 'json', x: 'x', y: 'y' } }),
      size: 12,
      color: '#fff',
      shape: 'circle',
    });

    layerGroup.addlayer(layer);

    expect(layerGroup.getLayer(layer.layer.id)).toEqual(layer);

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
