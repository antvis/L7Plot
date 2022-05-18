import { LayerGroup } from '../../../src/core/layer-group';
import { PointLayer } from '../../../src/core-layers/point-layer';

describe('layer group', () => {
  const layerGroup = new LayerGroup([]);
  const pointLayer1 = new PointLayer({
    name: 'pointLayer',
    source: { data: [], parser: { type: 'json', x: 'x', y: 'y' } },
  });
  const pointLayer2 = new PointLayer({ source: { data: [], parser: { type: 'json', x: 'x', y: 'y' } } });
  const pointLayer3 = new PointLayer({ source: { data: [], parser: { type: 'json', x: 'x', y: 'y' } } });

  it('addLayer', () => {
    layerGroup.addLayer(pointLayer1);
    expect(layerGroup.hasLayer(pointLayer1)).toBeTruthy();
    layerGroup.addLayers([pointLayer2, pointLayer3]);
    expect(layerGroup.hasLayer(pointLayer2)).toBeTruthy();
    expect(layerGroup.hasLayer(pointLayer3)).toBeTruthy();
  });

  it('getLayer', () => {
    expect(layerGroup.getLayers().length).toEqual(3);
    expect(layerGroup.getLayerByName(pointLayer1.name)).toEqual(pointLayer1);
    expect(layerGroup.getLayer(pointLayer2.layer.id)).toEqual(pointLayer2);
  });

  it('setZIndex', () => {
    layerGroup.setZIndex(3);
    layerGroup.getLayers().forEach((layer) => {
      expect(layer.layer.zIndex).toEqual(3);
    });
  });

  it('removeLayer', () => {
    expect(layerGroup.removeLayer(pointLayer1)).toBeTruthy();
    expect(layerGroup.hasLayer(pointLayer1)).toBeFalsy();

    expect(layerGroup.removeLayer(pointLayer2.layer.id)).toBeTruthy();
    expect(layerGroup.hasLayer(pointLayer2)).toBeFalsy();

    layerGroup.removeAllLayer();
    expect(layerGroup.hasLayer(pointLayer3)).toBeFalsy();
    expect(layerGroup.isEmpty()).toBeTruthy();
    expect(layerGroup.getLayers().length).toEqual(0);
  });
});
