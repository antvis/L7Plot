import { isUndefined } from '@antv/util';
import { CompositeLayerOptions } from '../../core/composite-layer';
import { LabelOptions } from './types';

interface WrapLayerOptions extends CompositeLayerOptions {
  label?: LabelOptions;
}

/**
 * 获取标注图层配置项
 */
export const getLabelLayerOptions = <T extends WrapLayerOptions>(options: T) => {
  const { visible, minZoom, maxZoom, zIndex = 0, label } = options;
  const labelVisible = visible && Boolean(label) && (isUndefined(label?.visible) || label?.visible);
  const labelLayerOptions = {
    zIndex: zIndex + 0.1,
    minZoom,
    maxZoom,
    ...label,
    visible: labelVisible,
  };

  return labelLayerOptions;
};
