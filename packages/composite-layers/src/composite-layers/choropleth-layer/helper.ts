import { LabelOptions } from '../common/types';
import { ISource } from '@antv/l7';

interface WrapLayerOptions {
  label?: LabelOptions;
}

/**
 * 自动计算标注图层坐标
 * 当自定义坐标字断时,只需要指定解析字段即可
 */

export const autoLabelCoordinates = (source: ISource, coord: WrapLayerOptions['label']) => {
  const position = coord?.position;
  const type = source.parser.type;
  const transforms = source.transforms;
  if (!position) {
    return source;
  }

  const originData = source['originData'];
  const newSource = { data: originData, transforms };
  if (position['coordinates']) {
    const coord = position['coordinates'];
    newSource['parser'] = { type, coordinates: coord };
  }
  if (position['x'] && position['y']) {
    const x = position['x'];
    const y = position['y'];
    newSource['parser'] = { type, x, y };
  }
  return newSource as ISource;
};
