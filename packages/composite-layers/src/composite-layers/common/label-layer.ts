import { ISource } from '@antv/l7';
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

/**
 * 自动计算标注图层坐标
 */

export const autoLabelCoordinates = <L extends WrapLayerOptions['label']>(source: ISource, coord: L) => {
  const position = coord?.position;
  if (!position) {
    return source;
  }
  return {
    data: source['originData']
      .map((properties) => {
        if (position['coordinates']) {
          return Object.assign({}, properties, { centroid: properties[position['coordinates']] });
        }
        if (position['x'] && position['y']) {
          return Object.assign({}, properties, { x: properties[position['x']], y: properties[position['y']] });
        }
      })
      .filter(({ centroid }) => centroid),
    parser: {
      type: 'json',
      ...(position['coordinates'] ? { coordinates: 'centroid' } : {}),
      ...(position['x'] && position['y'] ? { x: 'x', y: 'y' } : {}),
    },
    transforms: source.transforms,
  };
};
