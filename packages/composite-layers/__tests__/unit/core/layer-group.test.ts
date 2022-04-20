import { PointLayer } from '@antv/l7-layers';
import { LayerGroup } from '../../../src/core/layer-group';

describe('layer group', () => {
  const layerGroup = new LayerGroup([]);
  const pointLayer1 = new PointLayer({ name: 'pointLayer' });
  const pointLayer2 = new PointLayer({});
  const pointLayer3 = new PointLayer({});

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
    expect(layerGroup.getLayer(pointLayer2.id)).toEqual(pointLayer2);
  });

  it('setZIndex', () => {
    layerGroup.setZIndex(3);
    layerGroup.getLayers().forEach((layer) => {
      expect(layer.zIndex).toEqual(3);
    });
  });

  it('removeLayer', () => {
    expect(layerGroup.removeLayer(pointLayer1)).toBeTruthy();
    expect(layerGroup.hasLayer(pointLayer1)).toBeFalsy();

    expect(layerGroup.removeLayer(pointLayer2.id)).toBeTruthy();
    expect(layerGroup.hasLayer(pointLayer2)).toBeFalsy();

    layerGroup.removeAllLayer();
    expect(layerGroup.hasLayer(pointLayer3)).toBeFalsy();
    expect(layerGroup.isEmpty()).toBeTruthy();
    expect(layerGroup.getLayers().length).toEqual(0);
  });
});
