import { IconLayerOptions, IconLayerActiveOptions } from './types';
import { DEFAULT_HIGHLIGHT_COLOR, EMPTY_JSON_SOURCE } from '../common/constants';

export const EMPTY_SOURCE = { data: [], parser: { type: 'json', x: 'x', y: 'y' } };

/**
 * 默认的全部交互状态配置
 */
export const DEFAULT_STATE: { active: Required<IconLayerActiveOptions>; select: Required<IconLayerActiveOptions> } = {
  active: {
    enable: false,
    radius: 10,
    color: DEFAULT_HIGHLIGHT_COLOR,
    opacity: 1,
  },
  select: {
    enable: false,
    color: DEFAULT_HIGHLIGHT_COLOR,
    radius: 10,
    opacity: 1,
  },
};

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<IconLayerOptions> = {
  visible: true,
  source: EMPTY_SOURCE,
  radius: 12,
  icon: {
    value: '1',
  },
  state: {
    active: false,
    select: false,
  },
  enabledMultiSelect: false,
};
