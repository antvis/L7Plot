import { DEFAULT_HIGHLIGHT_COLOR, EMPTY_GEOJSON_SOURCE } from '../common/constants';
import { ChoroplethLayerActiveOptions, ChoroplethLayerOptions } from './types';

/**
 * 默认的全部交互状态配置
 */
export const DEFAULT_STATE: {
  active: Required<ChoroplethLayerActiveOptions>;
  select: Required<ChoroplethLayerActiveOptions>;
} = {
  active: {
    fillColor: false,
    strokeColor: DEFAULT_HIGHLIGHT_COLOR,
    lineWidth: 1,
    lineOpacity: 1,
  },
  select: {
    fillColor: false,
    strokeColor: DEFAULT_HIGHLIGHT_COLOR,
    lineWidth: 1,
    lineOpacity: 1,
  },
};

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<ChoroplethLayerOptions> = {
  visible: true,
  source: EMPTY_GEOJSON_SOURCE,
  lineWidth: 1,
  state: {
    active: false,
    select: false,
  },
  enabledMultiSelect: false,
  triggerMultiSelectKey: 'Shift',
  label:{
    position: false
  }
};
