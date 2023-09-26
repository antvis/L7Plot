import { Heatmap, HeatmapOptions } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/plots/heatmap/constants';
import data from '../../../data-set/heat-map.json';
import { createPlot } from '../../../helper/plot';

describe('heatmap', () => {
  it('defaultOptions', () => {
    expect(Heatmap.DefaultOptions).toEqual(DEFAULT_OPTIONS);
  });

  it('source', () => {
    const heatmap = createPlot<Heatmap, HeatmapOptions>(Heatmap, {
      source: {
        data: data,
        parser: { type: 'geojson' },
      },
      size: {
        field: 'mag',
      },
    });

    expect(heatmap.type).toEqual('heatmap');
    expect(heatmap.heatmapLayer).toBeDefined();
    expect(heatmap.labelLayer).toBeFalsy();

    heatmap.on('loaded', () => setTimeout(() => heatmap.destroy(), 0));
  });

  it('event', () => {
    const heatmap = createPlot<Heatmap, HeatmapOptions>(Heatmap, {
      source: {
        data: data,
        parser: { type: 'geojson' },
      },
      size: {
        field: 'mag',
      },
    });

    return new Promise<void>((resolve, reject) => {
      heatmap.on('heatmapLayer:add', () => {
        try {
          expect(heatmap.heatmapLayer?.layer.inited).toBeTruthy();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => heatmap.destroy(), 0);
      });
    });
  });

  it('legend', () => {
    const heatmap = createPlot<Heatmap, HeatmapOptions>(Heatmap, {
      source: {
        data: data,
        parser: { type: 'geojson' },
      },
      size: {
        field: 'mag',
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
      heatmap.on('add-legend', () => {
        try {
          expect(heatmap.legendControl).toBeDefined();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => heatmap.destroy(), 0);
      });
    });
  });
});
