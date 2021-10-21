import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { ChoroplethOptions } from './interface';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<ChoroplethOptions> = deepAssign({}, Plot.DefaultOptions, {
  source: {
    data: [],
    joinBy: {
      geoField: 'adcode',
    },
  },
  viewLevel: {
    level: 'country',
    adcode: '100000',
  },
});

/**
 * 行政数据默认显示粒度
 */
export const DEFAULT_AREA_GRANULARITY: Record<string, 'country' | 'province' | 'city' | 'district'> = {
  world: 'country',
  country: 'province',
  province: 'city',
  city: 'district',
  district: 'district',
};

/**
 * 行政数据服务地址
 */
export const AREA_URL = 'https://gw.alipayobjects.com/os/alisis/geo-data-v0.0.3/choropleth-data';

/**
 * 中国国界样式
 */
export const CHINA_BOUNDARY_STYLE = {
  国界: {
    color: 'red',
    width: 1,
    opacity: 1,
  },
  争议: {
    color: 'red',
    width: 1,
    opacity: 0.8,
    dashArray: [1, 6],
  },
  海洋: {
    color: 'blue',
    width: 0.7,
    opacity: 0.8,
  },
  港澳: {
    color: 'gray',
    width: 0.7,
    opacity: 0.8,
  },
};
