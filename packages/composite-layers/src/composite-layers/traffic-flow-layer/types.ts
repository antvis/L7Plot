import { CompositeLayerOptions } from '../../core/composite-layer';
import { PointLayerOptions } from '../../core-layers/point-layer/types';
import { LineLayerOptions } from '../../core-layers/line-layer/types';
import { ClusterColor, ClusterSize, FieldGetter, ClusterOptions } from './data-service/types';

/**
 * TrafficFlowLayer的配置定义
 */
export interface TrafficFlowLayerOptions<DataType = any> extends CompositeLayerOptions {
  /**
   * 聚合点图层颜色配置
   */
  pointColor: ClusterColor;

  /**
   * 聚合点图层大小配置
   */
  pointSize: ClusterSize;

  /**
   * 聚合点图层其他配置
   */
  pointConfig?: Partial<PointLayerOptions>;

  /**
   * 聚合线图层颜色配置
   */
  lineColor: ClusterColor;

  /**
   * 聚合线图层大小配置
   */
  lineSize: ClusterSize;

  /**
   * 聚合线图层其他配置
   */
  lineConfig?: Partial<LineLayerOptions>;

  /**
   * 聚合相关配置
   */
  cluster: ClusterOptions;

  /**
   * 关键字段获取
   */
  fieldGetter: FieldGetter<DataType>;

  /**
   * 传入OD数据数据
   */
  source: {
    data: DataType[];
  };

  /**
   * 当前层级的绘制物 > hideLimit 时，会隐藏起终点均不在屏幕内的聚合点及其对应的聚合线
   */
  hideLimit: number;
}

/**
 * 导出数据层内的类型定义
 */
export * from './data-service/types';
