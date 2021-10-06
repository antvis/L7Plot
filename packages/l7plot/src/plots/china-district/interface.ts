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
 * 行政层级
 */
export type ViewLevel = {
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
};

/**
 * 钻取维度
 */
export type DrillStep = {
  /**
   * 行政级别
   */
  level: 'country' | 'province' | 'city' | 'district';
  /**
   * 化行政级别下的粒度
   */
  granularity?: 'province' | 'city' | 'district';
};

/**
 * 行政层级数据
 */
export type AreaDepthData = Required<ViewLevel> & { source: ISource };

/**
 * 数据钻取
 * 下钻上卷
 */
export interface IDrill {
  /**
   * 钻取维度顺序
   */
  steps: DrillStep[] | DrillStep['level'][];
  /**
   * 上卷钻取的触发事件
   */
  triggerUp?: 'unclick' | 'undblclick' | 'uncontextmenu';
  /**
   * 下钻钻取的触发事件
   */
  triggerDown?: 'click' | 'dblclick' | 'contextmenu';
  /**
   * 上卷事件回调
   */
  onUp?: (from: ViewLevel, to: ViewLevel, data?: any) => void | Promise<any>;
  /**
   * 下钻事件回调
   */
  onDown?: (from: ViewLevel, to: ViewLevel, data: any) => void | Promise<any>;
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
  initialView: ViewLevel;

  /**
   * 数据钻取
   */
  drill?: false | IDrill;
}
