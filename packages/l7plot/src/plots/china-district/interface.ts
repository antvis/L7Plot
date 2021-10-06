import { IAreaLayerOptions } from '../../layers/area-layer/interface';
import { IPlotOptions, ISourceCFG } from '../../types';

/**
 * 地理元数据关联
 */
export interface IJoinBy {
  /**
   * 业务元数据地理字段
   */
  sourceField: string;
  /**
   * 地理数据字段
   */
  targetField?: string;
}

/**
 * 数据配置
 */
export interface ISource extends Pick<ISourceCFG, 'transforms'> {
  /**
   * 业务数据
   */
  data: any[];
  /**
   * 地理元数据关联
   */
  joinBy: IJoinBy;
}

/**
 * 初始化行政范围
 */
export interface IInitialView {
  /**
   * 初始化行政级别
   */
  level: 'world' | 'country' | 'province' | 'city' | 'district';
  /**
   * 初始化显示行政代码/行政名称
   */
  adCode: number | string;
  /**
   * 化行政级别下的粒度
   */
  granularity?: 'country' | 'province' | 'city' | 'district';
}

/** 中国行政区域图的配置类型定义 */
export interface ChinaDistrictOptions extends IPlotOptions, IAreaLayerOptions {
  /**
   * 具体的数据
   */
  source: ISource;

  /**
   * 初始化行政范围
   */
  initialView: IInitialView;
}
