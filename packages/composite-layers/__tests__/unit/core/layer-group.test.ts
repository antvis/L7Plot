import { LayerGroup } from '../../../src/core/layer-group';

describe('layer group', () => {
  const layerGroup = new LayerGroup([]);

  // eslint-disable-next-line jest/expect-expect
  it('layer', () => {
    // TODO: addLayer
    // layerGroup.addLayer(layer);
    // expect(layerGroup.getLayer(layer)).toEqual(layer);
    // expect(layerGroup.removeLayer(layer)).toBeTruthy();
    // expect(layerGroup.isEmpty()).toBeTruthy();
    // layerGroup.addLayer(layer);
    // expect(layerGroup.getLayerByName(layer.name)).toEqual(layer);
    // expect(layerGroup.hasLayer(layer)).toBeTruthy();
  });

  it('getLayers', () => {
    expect(layerGroup.getLayers().length).toEqual(0);
  });

  it('removelayer', () => {
    layerGroup.removeAllLayer();
    expect(layerGroup.getLayers().length).toEqual(0);
  });
});
