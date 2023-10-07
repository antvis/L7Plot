import { isUndefined } from '@antv/util';
import { CompositeLayerOptions } from '../../core/composite-layer';
import { FilterAttr } from '../../types';
import { LabelOptions } from './types';

interface WrapLayerOptions extends CompositeLayerOptions {
  label?: LabelOptions;
  /**
   * 数据过滤
   */
  filter?: FilterAttr;
}

/**
 * 获取标注图层配置项
 */
export const getLabelLayerOptions = <T extends WrapLayerOptions>(options: T) => {
  const { visible, minZoom, maxZoom, zIndex = 0, label, filter } = options;
  const labelVisible = visible && Boolean(label) && (isUndefined(label?.visible) || label?.visible);
  const labelLayerOptions = {
    zIndex: zIndex + 0.1,
    minZoom,
    maxZoom,
    filter,
    ...label,
    visible: labelVisible,
  };

  return labelLayerOptions;
};
