import { HexagonMap } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/plots/hexagon-map/constants';
import { createDiv } from '../../../helper/dom';
import data from '../../../data-set/heat-map.json';

describe('hexagon map', () => {
  it('defaultOptions', () => {
    expect(HexagonMap.DefaultOptions).toEqual(DEFAULT_OPTIONS);
  });

  it('source', () => {
    const hexagonMap = new HexagonMap(createDiv(), {
      source: {
        data: data,
        parser: { type: 'geojson' },
        aggregation: {
          field: 'mag',
          radius: 15000,
          type: 'sum',
        },
      },
      size: {
        field: 'mag',
      },
    });

    expect(hexagonMap.type).toEqual('hexagon');
    expect(hexagonMap.hexagonLayer).toBeDefined();
    expect(hexagonMap.labelLayer).toBeFalsy();

    hexagonMap.on('loaded', () => setTimeout(() => hexagonMap.destroy(), 0));
  });

  it('event', () => {
    const hexagonMap = new HexagonMap(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
        aggregation: { field: 't' },
      },
    });

    return new Promise<void>((resolve, reject) => {
      hexagonMap.on('hexagonLayer:add', () => {
        try {
          expect(hexagonMap.hexagonLayer?.inited).toBeTruthy();
          expect(hexagonMap.getLayerByName('hexagonLayer')).toBeDefined();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => hexagonMap.destroy(), 0);
      });
    });
  });
});
