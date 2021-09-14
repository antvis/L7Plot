import { DotLayer } from '../../../../src/layers/dot-layer';
import { Dot } from '../../../../src';
import { createDiv } from '../../../helper/dom';

describe('base layer', () => {
  it('show hide', () => {
    const dot = new Dot(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });
    return new Promise<void>((resolve, reject) => {
      dot.on('loaded', () => {
        try {
          const layerWrapper = dot['dotLayer'] as DotLayer;
          layerWrapper.hide();
          expect(layerWrapper.layer.isVisible()).toBeFalsy();

          layerWrapper.show();
          expect(layerWrapper.layer.isVisible()).toBeTruthy();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => dot.destroy(), 0);
      });
    });
  });

  it('toggleVisible', () => {
    const dot = new Dot(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });
    return new Promise<void>((resolve, reject) => {
      dot.on('loaded', () => {
        try {
          const layerWrapper = dot['dotLayer'] as DotLayer;
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
        setTimeout(() => dot.destroy(), 0);
      });
    });
  });
});
