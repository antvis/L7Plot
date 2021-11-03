import { pick, isUndefined } from '@antv/util';
import * as topojson from 'topojson-client';
import { Topology } from 'topojson-specification';
import { AREA_URL } from './constants';
import { ChoroplethOptions, DrillStep, DrillStepConfig } from './types';

export const getGeoAreaConfig = (geoArea?: ChoroplethOptions['geoArea']) => {
  const config = { url: AREA_URL, type: 'topojson', extension: 'topo.json' };
  if (isUndefined(geoArea)) return config;
  if (typeof geoArea === 'string') {
    config.url = geoArea;
  } else {
    config.url = geoArea?.url || AREA_URL;
    config.type = geoArea.type;
    config.extension = geoArea.type === 'topojson' ? 'topo.json' : 'json';
  }
  return config;
};

export const topojson2geojson = (json: Topology) => {
  try {
    const geojson = topojson.feature(json, 'json');
    return geojson;
  } catch (err) {
    throw new Error('topojson to geojson failed, topojson default layer name "json"');
  }
};

export const isEqualDrillSteps = (newSteps: DrillStep[], oldSteps: DrillStep[]) => {
  if (newSteps.length !== oldSteps.length) {
    return false;
  }

  for (let index = 0; index < newSteps.length; index++) {
    const { level, granularity } = newSteps[index];
    if (oldSteps[index].level !== level || oldSteps[index].granularity !== granularity) {
      return false;
    }
  }

  return true;
};

export const getDrillStepDefaultConfig = (options: ChoroplethOptions) => {
  const config = pick<any>(options, ['source', 'color', 'style', 'state', 'label', 'tooltip']) as DrillStepConfig;

  return config;
};
