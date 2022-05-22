import { ChoroplethLayerActiveOptions, ChoroplethLayerOptions } from './types';

/**
 * 空值 source
 */
export const EMPTY_SOURCE = { data: { type: 'FeatureCollection', features: [] }, parser: { type: 'geojson' } };

const defaultHighlightColor = '#2f54eb';

/**
 * 默认的全部交互状态配置
 */
export const DEFAULT_STATE: {
  active: Required<ChoroplethLayerActiveOptions>;
  select: Required<ChoroplethLayerActiveOptions>;
} = {
  active: {
    fillColor: false,
    strokeColor: defaultHighlightColor,
    lineWidth: 1,
    lineOpacity: 1,
  },
  select: {
    fillColor: false,
    strokeColor: defaultHighlightColor,
    lineWidth: 1,
    lineOpacity: 1,
  },
};

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<ChoroplethLayerOptions> = {
  visible: true,
  source: EMPTY_SOURCE,
  lineWidth: 1,
  state: {
    active: false,
    select: false,
  },
  enabledMultiSelect: false,
};
