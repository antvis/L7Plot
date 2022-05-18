import { AreaLayerActiveOptions, AreaLayerOptions } from './types';

/**
 * 空值 source
 */
export const EMPTY_SOURCE = { data: { type: 'FeatureCollection', features: [] }, parser: { type: 'geojson' } };

const defaultHighlightColor = '#2f54eb';

/**
 * 默认的全部交互状态配置
 */
export const DEFAULT_STATE: { active: Required<AreaLayerActiveOptions>; select: Required<AreaLayerActiveOptions> } = {
  active: {
    fill: false,
    stroke: defaultHighlightColor,
    lineWidth: 1.5,
    lineOpacity: 0.8,
  },
  select: {
    fill: false,
    stroke: defaultHighlightColor,
    lineWidth: 1.5,
    lineOpacity: 0.8,
  },
};

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<AreaLayerOptions> = {
  visible: true,
  source: EMPTY_SOURCE,
  state: {
    active: false,
    select: false,
  },
  enabledMultiSelect: false,
};
