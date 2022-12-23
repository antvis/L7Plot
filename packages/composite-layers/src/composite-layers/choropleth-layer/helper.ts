import { ChoroplethLayerOptions, LabelPosition } from './types';
import { SourceOptions } from '../../types/attr';
import { ISource } from '../../types/common';
import { isBoolean, isUndefined } from '@antv/util';
import { getLabelLayerOptions as getLabelOptions } from '../common/label-layer';

/**
 * 是否开启自定义标注图层坐标字段
 */
export const isLabelPosition = (
  position: LabelPosition['position']
): position is { x: string; y: string } | { coordinates: string } => {
  if (isUndefined(position) || isBoolean(position)) return false;

  if (isUndefined(position['coordinates']) || (isUndefined(position['x']) && isUndefined(position['y']))) {
    return false;
  }

  return true;
};

/**
 * 开启自定义标注图层坐标字段，解析标注图层 source
 */
export const parserLabeSourceData = (
  source: ISource,
  labelOptions: ChoroplethLayerOptions['label']
): ISource | SourceOptions => {
  const position = labelOptions?.position;
  if (!isLabelPosition(position)) {
    return source;
  }

  const type = source.parser.type;
  const transforms = source.transforms;
  const originData = source['originData'];
  const sourceOptions = { data: originData, transforms };

  if (position['coordinates']) {
    const coord = position['coordinates'];
    sourceOptions['parser'] = { type, coordinates: coord };
  } else if (position['x'] && position['y']) {
    const x = position['x'];
    const y = position['y'];
    sourceOptions['parser'] = { type, x, y };
  }

  return sourceOptions;
};

/**
 * 获取标注图层配置项
 */
export const getLabelLayerOptions = (options: ChoroplethLayerOptions, source: ISource) => {
  return {
    ...getLabelOptions<ChoroplethLayerOptions>(options),
    source: parserLabeSourceData(source, options.label),
  };
};
