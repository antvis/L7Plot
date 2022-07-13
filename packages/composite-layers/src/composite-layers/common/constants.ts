/**
 * 空值 JSON source
 */
export const EMPTY_JSON_SOURCE = { data: [], parser: { type: 'json', x: 'x', y: 'y' } };

/**
 * 空值 GEOJSON source
 */
export const EMPTY_GEOJSON_SOURCE = {
  data: {
    type: 'FeatureCollection',
    features: [],
  },
  parser: { type: 'geojson' },
};

export const DEFAULT_HIGHLIGHT_COLOR = '#2f54eb';
