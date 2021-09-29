import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { ChinaDistrictOptions } from './interface';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<ChinaDistrictOptions> = deepAssign({}, Plot.DefaultOptions, {
  source: {
    data: [],
    joinBy: {
      targetField: 'adcode',
    },
  },
});

/**
 * 行政数据服务地址
 */
export const DISTRICT_URL = {
  // ChinaBoundary: 'https://geo.datav.aliyun.com/areas_v3/bound/100000.json',
  ChinaBoundary: 'https://gw.alipayobjects.com/os/antfincdn/fFMSsgcuGf/100000_boundary.json',
  Country: {},
  Region: {},
  // Province: 'https://gw.alipayobjects.com/os/antfincdn/iUxSKWSIms/100000_full.json',
  Province: 'http://127.0.0.1:8080/100000_full.json',
  City: {},
  County: {},
};

/**
 * 国界样式
 */
export const CHINA_BOUNDARY_STYLE = {
  国界: {
    color: 'red',
    weight: 2,
    fillOpacity: 1,
    fillColor: '#fff',
  },
  省界: {
    color: '#F2F7F7',
    weight: 0.2,
    fillOpacity: 0.2,
    fillColor: '#fff',
    dashArray: [1, 10],
  },
  争议: {
    color: 'red',
    weight: 2,
    fillOpacity: 0.2,
    fillColor: '#fff',
    dashArray: [1, 6],
  },
  海洋: {
    color: 'blue',
    weight: 0.7,
    fillOpacity: 0.2,
    fillColor: '#fff',
  },
  港澳: {
    color: 'gray',
    weight: 0.7,
    fillOpacity: 0.2,
    fillColor: '#fff',
  },
};
