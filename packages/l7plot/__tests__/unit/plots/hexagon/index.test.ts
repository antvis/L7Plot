import { Hexagon } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/plots/hexagon/constants';
import { createDiv } from '../../../helper/dom';
import data from '../../../data-set/heat-map.json';

describe('hexagon', () => {
  it('defaultOptions', () => {
    expect(Hexagon.DefaultOptions).toEqual(DEFAULT_OPTIONS);
  });

  it('source', () => {
    const hexagonMap = new Hexagon(createDiv(), {
      source: {
        data: data,
        parser: { type: 'geojson' },
        aggregation: {
          field: 'mag',
          radius: 15000,
          method: 'sum',
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
    const hexagonMap = new Hexagon(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
        aggregation: { field: 't' },
      },
    });

    return new Promise<void>((resolve, reject) => {
      hexagonMap.on('hexagonLayer:add', () => {
        try {
          expect(hexagonMap.hexagonLayer?.layer.inited).toBeTruthy();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => hexagonMap.destroy(), 0);
      });
    });
  });
});
