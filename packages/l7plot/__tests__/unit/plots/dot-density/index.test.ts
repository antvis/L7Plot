import { createPlot } from '../../../helper/plot';
import { DotDensity, DotDensityOptions } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/plots/dot-density/constants';
import data from '../../../data-set/point-temperature.json';

describe('dot density', () => {
  it('defaultOptions', () => {
    expect(DotDensity.DefaultOptions).toEqual(DEFAULT_OPTIONS);
  });

  it('source', () => {
    const dotDensityMap = createPlot<DotDensity, DotDensityOptions>(DotDensity, {
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

    expect(dotDensityMap.type).toEqual('dotDensity');
    expect(dotDensityMap.dotDensityLayer).toBeDefined();

    dotDensityMap.on('loaded', () => setTimeout(() => dotDensityMap.destroy(), 0));
  });

  it('event', () => {
    const dotDensityMap = createPlot<DotDensity, DotDensityOptions>(DotDensity, {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });

    return new Promise<void>((resolve, reject) => {
      dotDensityMap.on('dotDensityLayer:add', () => {
        try {
          expect(dotDensityMap.dotDensityLayer?.layer.inited).toBeTruthy();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => dotDensityMap.destroy(), 0);
      });
    });
  });
});
