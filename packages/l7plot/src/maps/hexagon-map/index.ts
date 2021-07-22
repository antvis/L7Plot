import { ILayer } from '@antv/l7-core';
import { HexagonMapOptions } from './interface';
import { MapWrapper } from '../../core/map';
import { DEFAULT_OPTIONS } from './constants';
import { Heatmap } from '../heatmap';

export class HexagonMap extends Heatmap<HexagonMapOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = MapWrapper.MapType.Hexagon;

  /**
   * 蜂窝图层
   */
  get hexagonLayer(): ILayer {
    return this.heatmapLayerWrapper.layer;
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
  protected getDefaultOptions(): Partial<HexagonMapOptions> {
    return HexagonMap.DefaultOptions;
  }

  /**
   * 获取内置图层名
   */
  protected getInternalLayerName() {
    return { heatmapLayerName: 'hexagonLayer', labeLayerName: 'labelLayer' };
  }
}
