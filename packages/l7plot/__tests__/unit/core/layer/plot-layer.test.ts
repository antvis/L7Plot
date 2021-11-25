import { Dot, DotOptions } from '../../../../src';
import { createPlot } from '../../../helper/plot';

describe('plot layer', () => {
  it('show hide', () => {
    const dot = createPlot<Dot, DotOptions>(Dot, {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });
    return new Promise<void>((resolve, reject) => {
      dot.on('loaded', () => {
        try {
          const dotLayer = dot.dotLayer;
          dotLayer.hide();
          expect(dotLayer.layer.isVisible()).toBeFalsy();

          dotLayer.show();
          expect(dotLayer.layer.isVisible()).toBeTruthy();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => dot.destroy(), 0);
      });
    });
  });

  it('toggleVisible', () => {
    const dot = createPlot<Dot, DotOptions>(Dot, {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });
    return new Promise<void>((resolve, reject) => {
      dot.on('loaded', () => {
        try {
          const dotLayer = dot.dotLayer;
          dotLayer.hide();
          dotLayer.toggleVisible();
          expect(dotLayer.layer.isVisible()).toBeTruthy();

          dotLayer.show();
          dotLayer.toggleVisible();
          expect(dotLayer.layer.isVisible()).toBeFalsy();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => dot.destroy(), 0);
      });
    });
  });
});
