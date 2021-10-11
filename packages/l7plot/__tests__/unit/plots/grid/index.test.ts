import { createPlot } from '../../../helper/plot';
import { Grid, GridOptions } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/plots/grid/constants';
import data from '../../../data-set/heat-map.json';

describe('grid', () => {
  it('defaultOptions', () => {
    expect(Grid.DefaultOptions).toEqual(DEFAULT_OPTIONS);
  });

  it('source', () => {
    const gridMap = createPlot<Grid, GridOptions>(Grid, {
      source: {
        data: data,
        parser: { type: 'geojson' },
        aggregation: {
          field: 'mag',
          radius: 15000,
          method: 'sum',
        },
      },
      size: { field: 'mag' },
    });

    expect(gridMap.type).toEqual('grid');
    expect(gridMap.gridLayer).toBeDefined();
    expect(gridMap.labelLayer).toBeFalsy();

    gridMap.on('loaded', () => setTimeout(() => gridMap.destroy(), 0));
  });

  it('event', () => {
    const gridMap = createPlot<Grid, GridOptions>(Grid, {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
        aggregation: { field: 't' },
      },
    });

    return new Promise<void>((resolve, reject) => {
      gridMap.on('gridLayer:add', () => {
        try {
          expect(gridMap.gridLayer?.layer.inited).toBeTruthy();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => gridMap.destroy(), 0);
      });
    });
  });
});
