import { DotDensityMap } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/plots/dot-density-map/constants';
import { createDiv } from '../../../helper/dom';
import data from '../../../data-set/point-temperature.json';

describe('dot density map', () => {
  it('defaultOptions', () => {
    expect(DotDensityMap.DefaultOptions).toEqual(DEFAULT_OPTIONS);
  });

  it('source', () => {
    const dotDensityMap = new DotDensityMap(createDiv(), {
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

    expect(dotDensityMap.type).toEqual('pointCloud');
    expect(dotDensityMap.pointCloudLayer).toBeDefined();
    expect(dotDensityMap.labelLayer).toBeDefined();

    dotDensityMap.on('loaded', () => setTimeout(() => dotDensityMap.destroy(), 0));
  });

  it('event', () => {
    const dotDensityMap = new DotDensityMap(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });

    return new Promise<void>((resolve, reject) => {
      dotDensityMap.on('pointCloudLayer:add', () => {
        try {
          expect(dotDensityMap.pointCloudLayer?.inited).toBeTruthy();
          expect(dotDensityMap.getLayerByName('pointCloudLayer')).toBeDefined();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => dotDensityMap.destroy(), 0);
      });
    });
  });
});
