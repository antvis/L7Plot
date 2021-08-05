import { HeatMap } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/plots/heat-map/constants';
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

    expect(heatMap.type).toEqual('heatMap');
    expect(heatMap.heatmapLayer).toBeDefined();
    expect(heatMap.labelLayer).toBeFalsy();

    heatMap.on('loaded', () => setTimeout(() => heatMap.destroy(), 0));
  });

  it('event', () => {
    const heatMap = new HeatMap(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });

    return new Promise<void>((resolve, reject) => {
      heatMap.on('heatmapLayer:add', () => {
        try {
          expect(heatMap.heatmapLayer?.inited).toBeTruthy();
          expect(heatMap.getLayerByName('heatmapLayer')).toBeDefined();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => heatMap.destroy(), 0);
      });
    });
  });

  it('legend', () => {
    const heatMap = new HeatMap(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
      size: {
        field: 't',
        value: [0, 1],
      },
      style: {
        intensity: 3,
        radius: 20,
        opacity: 1,
        colorsRamp: [
          { color: 'rgba(33,102,172,0.0)', position: 0 },
          { color: 'rgb(103,169,207)', position: 0.2 },
          { color: 'rgb(209,229,240)', position: 0.4 },
          { color: 'rgb(253,219,199)', position: 0.6 },
          { color: 'rgb(239,138,98)', position: 0.8 },
          { color: 'rgb(178,24,43,1.0)', position: 1 },
        ],
      },
      legend: { position: 'bottomleft' },
    });

    return new Promise<void>((resolve, reject) => {
      heatMap.on('loaded', () => {
        try {
          expect(heatMap.legendControl).toBeDefined();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => heatMap.destroy(), 0);
      });
    });
  });
});
