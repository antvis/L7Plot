import { GridMapOptions, ISource } from './interface';
import { Source, ILayer, ISourceCFG, ITransform } from '../../types';
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
   * 获取网格聚合配置
   */
  protected getAggregationConfig(aggregation) {
    const { radius, type: method, field } = aggregation;
    const aggregationType = 'grid';
    const config = { type: aggregationType, size: radius, method, field };
    return config;
  }

  /**
   * 映射网格聚合配置
   */
  protected mappingAggregation(sourceCFG: ISourceCFG, transform: ITransform) {
    if (sourceCFG.transforms) {
      // 过滤 sourceCFG 有相同配置情况
      sourceCFG.transforms = sourceCFG.transforms.filter((transform) => transform.type !== transform.type);
      sourceCFG.transforms.push(transform);
    } else {
      sourceCFG.transforms = [transform];
    }
  }

  /**
   * 创建 source 实例
   */
  protected createSource() {
    const { data, aggregation, ...sourceCFG } = this.options.source;
    const transformsHexagon = this.getAggregationConfig(aggregation);
    this.mappingAggregation(sourceCFG, transformsHexagon);
    const source = new Source(data, sourceCFG);
    return source;
  }

  /**
   * 更新: 更新数据
   */
  public changeData(data: any, cfg?: Omit<ISource, 'data'>) {
    if (cfg) {
      const transformsHexagon = this.getAggregationConfig(cfg.aggregation);
      this.mappingAggregation(cfg, transformsHexagon);
    }

    this.source.setData(data, cfg);
  }

  /**
   * 网格图层
   */
  get gridLayer(): ILayer {
    return this.heatmapLayerWrapper.layer;
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<GridMapOptions> {
    return GridMap.DefaultOptions;
  }

  /**
   * 创建图层之前 hook
   */
  protected beforeCreateLayers() {
    const heatmapLayerConfig = { name: 'gridLayer' };

    return { heatmapLayerConfig };
  }
}
