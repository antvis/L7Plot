import { GridMap } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/maps/grid-map/constants';
import { createDiv } from '../../../helper/dom';
import data from '../../../data-set/heat-map.json';

describe('grid map', () => {
  it('defaultOptions', () => {
    expect(GridMap.DefaultOptions).toEqual(DEFAULT_OPTIONS);
  });

  it('source', () => {
    const gridMap = new GridMap(createDiv(), {
      source: {
        data: data,
        parser: { type: 'geojson' },
        aggregation: {
          field: 'mag',
          radius: 15000,
          type: 'sum',
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
    const gridMap = new GridMap(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
        aggregation: { field: 't' },
      },
    });

    return new Promise<void>((resolve, reject) => {
      gridMap.on('gridLayer:add', () => {
        try {
          expect(gridMap.gridLayer?.inited).toBeTruthy();
          expect(gridMap.getLayerByName('gridLayer')).toBeDefined();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => gridMap.destroy(), 0);
      });
    });
  });
});
