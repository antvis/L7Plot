import { Dot, DotOptions } from '../../../../src';
import { createPlot } from '../../../helper/plot';

describe('core plot', () => {
  it('render', () => {
    const dotMap = createPlot<Dot, DotOptions>(Dot, {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
      shape: 'square',
    });
    return new Promise<void>((resolve, reject) => {
      dotMap.on('loaded', () => {
        try {
          dotMap.updateOption({ shape: 'circle' });
          dotMap.render();
          expect(dotMap.options.shape).toEqual('circle');
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => dotMap.destroy(), 0);
      });
    });
  });

  it(
    'update',
    () => {
      const dotMap = createPlot<Dot, DotOptions>(Dot, {
        source: {
          data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
          parser: { type: 'json' },
        },
        shape: 'circle',
      });
      return new Promise<void>((resolve, reject) => {
        dotMap.on('loaded', () => {
          try {
            dotMap.update({ shape: 'square' });
            expect(dotMap.options.shape).toEqual('square');
            resolve();
          } catch (err) {
            reject(err);
          }
          setTimeout(() => dotMap.destroy(), 0);
        });
      });
    },
    1000 * 10
  );

  it('change data', () => {
    const dotMap = createPlot<Dot, DotOptions>(Dot, {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });
    const data = [{ x: 109, y: 29 }];
    return new Promise<void>((resolve, reject) => {
      dotMap.on('loaded', () => {
        try {
          dotMap.changeData(data);
          expect(dotMap.source['originData']).toEqual(data);
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => dotMap.destroy(), 0);
      });
    });
  });

  it('change size', () => {
    const dotMap = createPlot<Dot, DotOptions>(Dot, {
      width: 700,
      height: 300,
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });
    return new Promise<void>((resolve, reject) => {
      dotMap.on('loaded', () => {
        try {
          dotMap.changeSize(1000, 500);
          expect(dotMap.container.style.width).toEqual('1000px');
          expect(dotMap.container.style.height).toEqual('500px');
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => dotMap.destroy(), 0);
      });
    });
  });

  it('controls', () => {
    const dotMap = createPlot<Dot, DotOptions>(Dot, {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
      zoom: { position: 'bottomright' },
      scale: { position: 'bottomright' },
      layerMenu: { position: 'topright' },
    });

    return new Promise<void>((resolve, reject) => {
      dotMap.on('loaded', () => {
        try {
          expect(dotMap.zoomControl).toBeDefined();
          expect(dotMap.scaleControl).toBeDefined();
          expect(dotMap.layerMenuControl).toBeDefined();

          dotMap.removeZoomControl();
          dotMap.removeScaleControl();
          dotMap.removeLayerMenuControl();

          expect(dotMap.zoomControl).toBeUndefined();
          expect(dotMap.scaleControl).toBeUndefined();
          expect(dotMap.layerMenuControl).toBeUndefined();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => dotMap.destroy(), 0);
      });
    });
  });

  it('loaded event', () => {
    const dotMap = createPlot<Dot, DotOptions>(Dot, {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });
    return new Promise<void>((resolve, reject) => {
      dotMap.on('loaded', () => {
        try {
          expect(dotMap.scene['sceneService'].loaded).toBeTruthy();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => dotMap.destroy(), 0);
      });
    });
  });

  it('layer add event', () => {
    const dotMap = createPlot<Dot, DotOptions>(Dot, {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });
    return new Promise<void>((resolve, reject) => {
      dotMap.on('dotLayer:add', () => {
        try {
          expect(dotMap.dotLayer?.layer.inited).toBeTruthy();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => dotMap.destroy(), 0);
      });
    });
  });
});
