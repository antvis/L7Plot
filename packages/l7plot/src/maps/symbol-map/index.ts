import { ILayer } from '@antv/l7-core';
import { MapWrapper } from '../../core/map';
import { PointMap } from '../point-map';
import { DEFAULT_OPTIONS } from './constants';
import { SymbolMapOptions } from './interface';
export class SymbolMap extends PointMap<SymbolMapOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = MapWrapper.MapType.Symbol;

  /**
   * 符号图层
   */
  get symbolLayer(): ILayer {
    return this.pointLayerWrapper.layer;
  }

  /**
   * 标注图层
   */
  get labelLayer(): ILayer | undefined {
    return this.labelLayerWrapper?.layer;
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<SymbolMapOptions> {
    return SymbolMap.DefaultOptions;
  }

  /**
   * 获取内置图层名
   */
  protected getInternalLayerName() {
    return { pointLayerName: 'symbolLayer', labeLayerName: 'labelLayer' };
  }
}
