import { PointMap } from '../../../../src';
import { createDiv } from '../../../helper/dom';

describe('core map', () => {
  it(
    'update',
    () => {
      const pointMap = new PointMap(createDiv(), {
        source: {
          data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
          parser: { type: 'json' },
        },
        shape: 'circle',
      });
      return new Promise<void>((resolve, reject) => {
        pointMap.on('loaded', () => {
          try {
            pointMap.update({ shape: 'square' });
            expect(pointMap.options.shape).toEqual('square');
            resolve();
          } catch (err) {
            reject(err);
          }
          setTimeout(() => pointMap.destroy(), 0);
        });
      });
    },
    1000 * 10
  );

  it('render', () => {
    const pointMap = new PointMap(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
      shape: 'square',
    });
    return new Promise<void>((resolve, reject) => {
      pointMap.on('loaded', () => {
        try {
          pointMap.updateOption({ shape: 'circle' });
          pointMap.render();
          expect(pointMap.options.shape).toEqual('circle');
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => pointMap.destroy(), 0);
      });
    });
  });

  it('change data', () => {
    const pointMap = new PointMap(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });
    const data = [{ x: 109, y: 29 }];
    return new Promise<void>((resolve, reject) => {
      pointMap.on('loaded', () => {
        try {
          pointMap.changeData(data);
          expect(pointMap.source['originData']).toEqual(data);
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => pointMap.destroy(), 0);
      });
    });
  });

  it('controls', () => {
    const pointMap = new PointMap(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
      zoom: { position: 'bottomright' },
      scale: { position: 'bottomright' },
      layerMenu: { position: 'topright' },
    });

    expect(pointMap.zoomControl).toBeDefined();
    expect(pointMap.scaleControl).toBeDefined();
    expect(pointMap.layerMenuControl).toBeDefined();

    pointMap.removeZoomControl();
    pointMap.removeScaleControl();
    pointMap.removeLayerMenuControl();

    expect(pointMap.zoomControl).toBeUndefined();
    expect(pointMap.scaleControl).toBeUndefined();
    expect(pointMap.layerMenuControl).toBeUndefined();

    pointMap.on('loaded', () => setTimeout(() => pointMap.destroy(), 0));
  });

  it('loaded event', () => {
    const pointMap = new PointMap(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });
    return new Promise<void>((resolve, reject) => {
      pointMap.on('loaded', () => {
        try {
          expect(pointMap.scene['sceneService'].loaded).toBeTruthy();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => pointMap.destroy(), 0);
      });
    });
  });

  it('layer add event', () => {
    const pointMap = new PointMap(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });
    return new Promise<void>((resolve, reject) => {
      pointMap.on('pointLayer:add', () => {
        try {
          expect(pointMap.pointLayer?.inited).toBeTruthy();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => pointMap.destroy(), 0);
      });
    });
  });
});
