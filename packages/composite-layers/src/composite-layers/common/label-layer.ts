import { ISource } from '@antv/l7';
import { isUndefined } from '@antv/util';
import { CompositeLayerOptions } from '../../core/composite-layer';
import { LabelOptions, LabelCoord } from './types';

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

/**
 * 自动计算标注图层坐标
 */

export const autoLabelCoordinates = <L extends WrapLayerOptions['label']>(source: ISource, coord: L) => {
  const autoCompute = coord?.autoCompute
  if (!autoCompute) {
    return source
  }
  return {
    data: source['originData']
      .map((properties) => {
        if (autoCompute['coordinates']) {
          return Object.assign(
            {}, properties,
            { centroid: properties[autoCompute['coordinates']] }
          )
        }
        if (autoCompute['x'] && autoCompute['y']) {
          return Object.assign(
            {}, properties,
            { x: properties[autoCompute['x']], y: properties[autoCompute['y']] }
          )
        }
      })
      .filter(({ centroid }) => centroid),
    parser: {
      type: 'json',
      ...(autoCompute['coordinates'] ? { coordinates: autoCompute['coordinates'] } : {}),
      ...(autoCompute['x'] && autoCompute['y'] ? {x: autoCompute['x'],y: autoCompute['y']}: {} )
    },
    transforms: source.transforms,
  }
}
