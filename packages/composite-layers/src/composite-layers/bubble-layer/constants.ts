import { BubbleLayerActiveOptions, BubbleLayerOptions } from './types';

/**
 * 空值 source
 */
export const EMPTY_SOURCE = { data: [], parser: { type: 'json', x: 'x', y: 'y' } };

const defaultHighlightColor = '#2f54eb';

/**
 * 默认的全部交互状态配置
 */
export const DEFAULT_STATE: { active: Required<BubbleLayerActiveOptions>; select: Required<BubbleLayerActiveOptions> } =
  {
    active: {
      fillColor: false,
      strokeColor: defaultHighlightColor,
      lineWidth: 1.5,
      lineOpacity: 1,
    },
    select: {
      fillColor: false,
      strokeColor: defaultHighlightColor,
      lineWidth: 1.5,
      lineOpacity: 1,
    },
  };

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<BubbleLayerOptions> = {
  visible: true,
  source: {
    data: [],
    parser: { type: 'json', x: 'x', y: 'y' },
  },
  radius: 12,
  fillColor: '#5FD3A6',
  state: {
    active: false,
    select: false,
  },
  enabledMultiSelect: false,
};
