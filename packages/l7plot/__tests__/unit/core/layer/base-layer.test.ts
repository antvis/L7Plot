import { PointLayerWrapper } from '../../../../src/layers/point-layer';
import { PointMap } from '../../../../src';
import { createDiv } from '../../../helper/dom';

describe('base layer', () => {
  const pointMap = new PointMap(createDiv(), {
    source: {
      data: [],
      parser: { type: 'json' },
    },
  });

  it('show hide', () => {
    pointMap.pointLayer?.once('inited', () => {
      const layerWrapper = pointMap['pointLayerWrapper'] as PointLayerWrapper;
      layerWrapper.hide();
      expect(layerWrapper.layer.isVisible()).toBeFalsy();

      layerWrapper.show();
      layerWrapper.toggleVisible();
      expect(layerWrapper.layer.isVisible()).toBeTruthy();
    });
  });

  it('toggleVisible', () => {
    pointMap.pointLayer?.once('inited', () => {
      const layerWrapper = pointMap['pointLayerWrapper'] as PointLayerWrapper;
      layerWrapper.hide();
      layerWrapper.toggleVisible();
      expect(layerWrapper.layer.isVisible()).toBeTruthy();

      layerWrapper.show();
      layerWrapper.toggleVisible();
      expect(layerWrapper.layer.isVisible()).toBeFalsy();
      pointMap.destroy();
    });
  });
});
