import { PointCloudMap } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/maps/point-cloud-map/constants';
import { createDiv } from '../../../helper/dom';
import data from '../../../data-set/point-temperature.json';

describe('dot map', () => {
  it('defaultOptions', () => {
    expect(PointCloudMap.DefaultOptions).toEqual(DEFAULT_OPTIONS);
  });

  it('source', () => {
    const dotMap = new PointCloudMap(createDiv(), {
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

    expect(dotMap.type).toEqual('dot');
    expect(dotMap.pointCloudLayer).toBeDefined();
    expect(dotMap.labelLayer).toBeDefined();

    dotMap.on('loaded', () => setTimeout(() => dotMap.destroy(), 0));
  });

  it('event', () => {
    const scatterMap = new PointCloudMap(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });

    return new Promise<void>((resolve, reject) => {
      scatterMap.on('pointCloudLayer:add', () => {
        try {
          expect(scatterMap.pointCloudLayer?.inited).toBeTruthy();
          expect(scatterMap.getLayerByName('pointCloudLayer')).toBeDefined();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => scatterMap.destroy(), 0);
      });
    });
  });
});
