import { AreaLayerOptions } from '../../layers/area-layer/types';
import { PlotOptions, ISourceCFG } from '../../types';

/**
 * GeoJson 数据格式
 */
export type GeoJson = { type: 'FeatureCollection'; features: any[] };

/**
 * 地理元数据关联
 */
export type JoinBy = {
  /**
   * 业务元数据地理字段
   */
  sourceField: string;
  /**
   * 地理数据字段
   */
  geoField?: string;
  /**
   * 地理数据
   */
  geoData?: GeoJson;
};

/**
 * 数据配置
 */
export interface ChoroplethSourceOptions extends Pick<ISourceCFG, 'transforms'> {
  /**
   * 业务数据
   */
  data: any[];
  /**
   * 地理元数据关联
   */
  joinBy: JoinBy;
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
  adcode: number | string;
  /**
   * 化行政级别下的粒度
   */
  granularity?: 'country' | 'province' | 'city' | 'district';
};

/**
 * 钻取维度配置项
 */
export type DrillStepConfig = Partial<Pick<AreaLayerOptions, 'color' | 'style' | 'state'>> &
  Pick<PlotOptions, 'label' | 'tooltip'> & { source?: Partial<ChoroplethSourceOptions> };

/**
 * 钻取维度
 */
export type DrillStep = DrillStepConfig & {
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
 * 数据钻取
 * 下钻上卷
 */
export type Drill = {
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
  onUp?: (from: ViewLevel, to: ViewLevel, callback: (config?: DrillStepConfig) => void) => void;
  /**
   * 下钻事件回调
   */
  onDown?: (
    from: ViewLevel,
    to: ViewLevel & { properties: Record<string, any> },
    callback: (config?: DrillStepConfig) => void
  ) => void;
};

/** 地区分布图的配置类型定义 */
export interface ChoroplethOptions extends PlotOptions, AreaLayerOptions {
  /**
   * 行政地理数据静态服务址
   */
  geoUrl?: string;
  /**
   * 具体的数据
   */
  source: ChoroplethSourceOptions;

  /**
   * 初始化行政级别及范围
   */
  viewLevel: ViewLevel;

  /**
   * 数据钻取
   */
  drill?: false | Drill;
}

/**
 * 行政层级数据
 */
export type DrillStack = Required<ViewLevel> & { config: DrillStepConfig };
