import { createPlot } from '../../../helper/plot';
import { Hexbin, HexbinOptions } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/plots/hexbin/constants';
import data from '../../../data-set/heat-map.json';

describe('hexbin', () => {
  it('defaultOptions', () => {
    expect(Hexbin.DefaultOptions).toEqual(DEFAULT_OPTIONS);
  });

  it('source', () => {
    const hexbinMap = createPlot<Hexbin, HexbinOptions>(Hexbin, {
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

    expect(hexbinMap.type).toEqual('hexbin');
    expect(hexbinMap.hexbinLayer).toBeDefined();
    expect(hexbinMap.labelLayer).toBeFalsy();

    hexbinMap.on('loaded', () => setTimeout(() => hexbinMap.destroy(), 0));
  });

  it('event', () => {
    const hexbinMap = createPlot<Hexbin, HexbinOptions>(Hexbin, {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
        aggregation: { field: 't' },
      },
    });

    return new Promise<void>((resolve, reject) => {
      hexbinMap.on('hexbinLayer:add', () => {
        try {
          expect(hexbinMap.hexbinLayer?.layer.inited).toBeTruthy();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => hexbinMap.destroy(), 0);
      });
    });
  });
});
