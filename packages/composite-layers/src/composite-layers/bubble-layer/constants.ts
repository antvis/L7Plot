import { DEFAULT_HIGHLIGHT_COLOR, EMPTY_JSON_SOURCE } from '../common/constants';
import { BubbleLayerActiveOptions, BubbleLayerOptions } from './types';

/**
 * 默认的全部交互状态配置
 */
export const DEFAULT_STATE: { active: Required<BubbleLayerActiveOptions>; select: Required<BubbleLayerActiveOptions> } =
  {
    active: {
      fillColor: false,
      strokeColor: DEFAULT_HIGHLIGHT_COLOR,
      lineWidth: 1.5,
      lineOpacity: 1,
    },
    select: {
      fillColor: false,
      strokeColor: DEFAULT_HIGHLIGHT_COLOR,
      lineWidth: 1.5,
      lineOpacity: 1,
    },
  };

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<BubbleLayerOptions> = {
  visible: true,
  source: EMPTY_JSON_SOURCE,
  radius: 12,
  fillColor: '#5FD3A6',
  lineWidth: 1,
  state: {
    active: false,
    select: false,
  },
  enabledMultiSelect: false,
  triggerMultiSelectKey: 'Shift',
};
