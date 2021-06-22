import { ShapeAttr } from '../../types';
import { PointMapOptions } from '../point-map/interface';

/** 符号图的配置类型定义 */
export interface SymbolMapOptions extends PointMapOptions {
  /**
   * 图斑形状
   */
  shape?: ShapeAttr<string>;
}
