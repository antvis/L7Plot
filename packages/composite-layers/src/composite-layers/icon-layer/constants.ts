import { IconLayerOptions } from './types';
import { DEFAULT_HIGHLIGHT_COLOR, EMPTY_JSON_SOURCE } from '../common/constants';

/**
 * 默认的全部交互状态配置
 */
export const DEFAULT_STATE: IconLayerOptions['state'] = {
  active: {
    enable: false,
    color: DEFAULT_HIGHLIGHT_COLOR,
  },
  select: {
    enable: false,
    radius: 10,
    opacity: 1,
  },
};

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<IconLayerOptions> = {
  visible: true,
  source: EMPTY_JSON_SOURCE,
  radius: 12,
  icon: {
    value: '1',
  },
  state: {
    active: false,
    select: false,
  },
  blend: 'normal',
  enabledMultiSelect: false,
  triggerMultiSelectKey: 'Shift',
};
