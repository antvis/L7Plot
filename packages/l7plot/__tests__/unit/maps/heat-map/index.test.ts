import { HeatMap } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/maps/heat-map/constants';
import { createDiv } from '../../../helper/dom';
import data from '../../../data-set/heat-map.json';

describe('heat map', () => {
  it('defaultOptions', () => {
    expect(HeatMap.DefaultOptions).toEqual(DEFAULT_OPTIONS);
  });

  it('source', () => {
    const heatMap = new HeatMap(createDiv(), {
      source: {
        data: data,
        parser: { type: 'geojson' },
      },
      size: {
        field: 'mag',
      },
    });

    expect(heatMap.type).toEqual('heatmap');
    expect(heatMap.heatMapLayer).toBeDefined();
    expect(heatMap.labelLayer).toBeFalsy();

    heatMap.on('loaded', () => setTimeout(() => heatMap.destroy(), 0));

    it('event', () => {
      const heatMap = new HeatMap(createDiv(), {
        source: {
          data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
          parser: { type: 'json' },
        },
      });

      return new Promise<void>((resolve, reject) => {
        heatMap.on('heatMapLayer:add', () => {
          try {
            expect(heatMap.heatMapLayer?.inited).toBeTruthy();
            expect(heatMap.getLayerByName('heatMapLayer')).toBeDefined();
            resolve();
          } catch (err) {
            reject(err);
          }
          setTimeout(() => heatMap.destroy(), 0);
        });
      });
    });
  });
});
