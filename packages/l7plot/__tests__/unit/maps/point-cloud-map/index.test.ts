import { PointCloudMap } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/maps/point-cloud-map/constants';
import { createDiv } from '../../../helper/dom';
import data from '../../../data-set/point-temperature.json';

describe('point cloud map', () => {
  it('defaultOptions', () => {
    expect(PointCloudMap.DefaultOptions).toEqual(DEFAULT_OPTIONS);
  });

  it('source', () => {
    const pointCloudMap = new PointCloudMap(createDiv(), {
      source: {
        data: data.list,
        parser: { type: 'json', x: 'j', y: 'w' },
      },
      color: 'red',
      size: 1,
      label: {
        field: 't',
        style: {
          fill: '#fff',
          opacity: 0.6,
          fontSize: 12,
        },
      },
    });

    expect(pointCloudMap.type).toEqual('pointCloud');
    expect(pointCloudMap.pointCloudLayer).toBeDefined();
    expect(pointCloudMap.labelLayer).toBeDefined();

    pointCloudMap.on('loaded', () => setTimeout(() => pointCloudMap.destroy(), 0));
  });

  it('event', () => {
    const pointCloudMap = new PointCloudMap(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });

    return new Promise<void>((resolve, reject) => {
      pointCloudMap.on('pointCloudLayer:add', () => {
        try {
          expect(pointCloudMap.pointCloudLayer?.inited).toBeTruthy();
          expect(pointCloudMap.getLayerByName('pointCloudLayer')).toBeDefined();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => pointCloudMap.destroy(), 0);
      });
    });
  });
});
