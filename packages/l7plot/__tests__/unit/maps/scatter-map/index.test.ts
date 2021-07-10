import { ScatterMap } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/maps/scatter-map/constants';
import { createDiv } from '../../../helper/dom';
import data from '../../../data-set/point-temperature.json';

describe('scatter map', () => {
  it('defaultOptions', () => {
    expect(ScatterMap.DefaultOptions).toEqual(DEFAULT_OPTIONS);
  });

  it('source', () => {
    const scatterMap = new ScatterMap(createDiv(), {
      source: {
        data: data.list,
        parser: { type: 'json', x: 'j', y: 'w' },
      },
      color: {
        field: 't',
        value: ['#34B6B7', '#4AC5AF', '#5FD3A6', '#7BE39E', '#A1EDB8', '#CEF8D6'],
      },
      size: 4,
      label: {
        field: 't',
        style: {
          fill: '#fff',
          opacity: 0.6,
          fontSize: 12,
        },
      },
    });

    expect(scatterMap.type).toEqual('scatter');
    expect(scatterMap.scatterLayer).toBeDefined();
    expect(scatterMap.labelLayer).toBeDefined();

    scatterMap.on('loaded', () => setTimeout(() => scatterMap.destroy(), 0));

    it('event', () => {
      const scatterMap = new ScatterMap(createDiv(), {
        source: {
          data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
          parser: { type: 'json' },
        },
      });

      return new Promise<void>((resolve, reject) => {
        scatterMap.on('scatterLayer:add', () => {
          try {
            expect(scatterMap.scatterLayer?.inited).toBeTruthy();
            expect(scatterMap.getLayerByName('scatterLayer')).toBeDefined();
            resolve();
          } catch (err) {
            reject(err);
          }
          setTimeout(() => scatterMap.destroy(), 0);
        });
      });
    });
  });
});
