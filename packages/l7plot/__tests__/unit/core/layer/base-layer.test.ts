import { PointLayerWrapper } from '../../../../src/layers/point-layer';
import { PointMap } from '../../../../src';
import { createDiv } from '../../../helper/dom';

describe('base layer', () => {
  it('show hide', () => {
    const pointMap = new PointMap(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });
    return new Promise<void>((resolve, reject) => {
      pointMap.on('loaded', () => {
        try {
          const layerWrapper = pointMap['pointLayerWrapper'] as PointLayerWrapper;
          layerWrapper.hide();
          expect(layerWrapper.layer.isVisible()).toBeFalsy();

          layerWrapper.show();
          expect(layerWrapper.layer.isVisible()).toBeTruthy();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => pointMap.destroy(), 0);
      });
    });
  });

  it('toggleVisible', () => {
    const pointMap = new PointMap(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });
    return new Promise<void>((resolve, reject) => {
      pointMap.on('loaded', () => {
        try {
          const layerWrapper = pointMap['pointLayerWrapper'] as PointLayerWrapper;
          layerWrapper.hide();
          layerWrapper.toggleVisible();
          expect(layerWrapper.layer.isVisible()).toBeTruthy();

          layerWrapper.show();
          layerWrapper.toggleVisible();
          expect(layerWrapper.layer.isVisible()).toBeFalsy();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => pointMap.destroy(), 0);
      });
    });
  });
});
