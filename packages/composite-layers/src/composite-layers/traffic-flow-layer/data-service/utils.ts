import { Getter } from './types';
import { get } from '@antv/util';

export const lng2X = (lng: number) => {
  return lng / 360 + 0.5;
};

export const lat2Y = (lat: number) => {
  const sin = Math.sin((lat * Math.PI) / 180);
  const y = 0.5 - (0.25 * Math.log((1 + sin) / (1 - sin))) / Math.PI;
  return y < 0 ? 0 : y > 1 ? 1 : y;
};

export function x2Lng(x: number) {
  return (x - 0.5) * 360;
}

export function y2Lat(y: number) {
  const y2 = ((180 - y * 360) * Math.PI) / 180;
  return (360 * Math.atan(Math.exp(y2))) / Math.PI - 90;
}

/**
 * 传入原始数据项，通过访问器获取数据
 * @param item 原始数据项
 * @param index 原始数据项对应的下标
 * @param getter     访问器
 * @param defaultValue 默认值，可选
 */

export function getValueByGetter<DataType = any>(
  item: DataType,
  index: number,
  getter: Getter<DataType>,
  defaultValue?: DataType
): DataType | undefined {
  if (typeof getter === 'function') {
    return getter(item, index) ?? defaultValue;
  }
  return get(item, getter, defaultValue);
}

let id = 1;

export function createUuid() {
  // function S4() {
  //   // eslint-disable-next-line no-bitwise
  //   return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  // }
  // return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
  return String(id++);
}
