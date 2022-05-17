import { DotLayerOptions } from './types';

// const defaultHighlightColor = '#2f54eb';

/**
 * 默认的全部交互状态配置
 */
// export const DEFAULT_STATE: { active: Required<AreaLayerActiveOptions>; select: Required<AreaLayerActiveOptions> } = {
//   active: {
//     fill: false,
//     stroke: defaultHighlightColor,
//     lineWidth: 1.5,
//     lineOpacity: 0.8,
//   },
//   select: {
//     fill: false,
//     stroke: defaultHighlightColor,
//     lineWidth: 1.5,
//     lineOpacity: 0.8,
//   },
// };

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<DotLayerOptions> = {
  source: {
    data: [],
    parser: {
      type: 'json',
      x: 'x',
      y: 'y',
    },
  },
  shape: 'circle',
  size: 12,
  color: '#5FD3A6',
};
