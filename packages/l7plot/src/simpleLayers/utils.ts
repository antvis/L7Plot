import { isNumber } from 'lodash-es';
import { ISimpleData, ISimpleParams } from './types';
export const DefaultParams = {
  shape: 'circle',
  lng: 'lng',
  lat: 'lat',
  lntlatFilter: true,
  opacity: 1,
  size: 10,
  color: '#f00',
  select: true,
  active: false,
  zIndex: 0,
  visible: true,
  blend: 'normal',
  stroke: '#fff',
  strokeWidth: 0,
};

export function buildPointOptions(data: ISimpleData, params: ISimpleParams): ISimpleParams {
  const {
    shape,
    lng,
    lat,
    lntlatFilter,
    opacity,
    size,
    color,
    select,
    active,
    blend,
    stroke,
    strokeWidth,
    zIndex,
    animate,
  } = params;
  const options = {
    shape,
    source: {
      data: filterData(lntlatFilter, lng, lat, data),
      parser: {
        x: lng,
        y: lat,
        type: 'json',
      },
    },
    style: {
      opacity,
      strokeWidth,
      stroke,
    },
    state: {
      select,
      active,
    },
    animate,
    color,
    size,
    blend,
    zIndex,
  };
  if (animate) {
    options.animate = animate;
  }
  return options;
}

/**
 * 过滤数据 保证点位正确显示 lng/lat
 * @param lntlatFilter
 * @param lng
 * @param lat
 * @param data
 * @returns
 */
function filterData(lntlatFilter: boolean, lng: string, lat: string, data: ISimpleData): ISimpleData {
  if (lntlatFilter) {
    const filterData = data.filter((d) => isNumber(d[lng]) && isNumber(d[lat]));
    if (filterData.length === 0) {
      console.warn('warning! filter data is empty!');
    }
    return filterData;
  } else {
    return data;
  }
}
