import { ILayer } from '@antv/l7-core';
import { GridMapOptions } from './interface';
import { MapWrapper } from '../../core/map';
import { DEFAULT_OPTIONS } from './constants';
import { Heatmap } from '../heatmap';

export class GridMap extends Heatmap<GridMapOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 地图类型
   */
  public type = MapWrapper.MapType.Grid;

  /**
   * 网格图层
   */
  get gridLayer(): ILayer {
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
  protected getDefaultOptions(): Partial<GridMapOptions> {
    return GridMap.DefaultOptions;
  }

  /**
   * 获取内置图层名
   */
  protected getInternalLayerName() {
    return { heatmapLayerName: 'gridLayer', labeLayerName: 'labelLayer' };
  }
}
