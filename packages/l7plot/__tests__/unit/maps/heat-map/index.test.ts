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

    heatMap.on('loaded', () => setTimeout(() => heatMap.destroy(), 0));
  });
});
