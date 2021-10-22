import { pick } from '@antv/util';
import Source from '@antv/l7-source';
import { LayerType, IPLotLayer, PlotLayerConfig } from '../../types/layer';
import { Scene, ILayer, ILayerConfig, SourceOptions } from '../../types';
import { MappingSource } from '../../adaptor/source';

const LayerConfigkeys = ['name', 'zIndex', 'visible', 'minZoom', 'maxZoom', 'pickingBuffer', 'autoFit', 'blend'];

export abstract class PlotLayer<O extends PlotLayerConfig> implements IPLotLayer {
  /**
   * 地图图表类型
   */
  static LayerType = LayerType;
  /**
   * layer 的 schema 配置
   */
  public abstract readonly options: O;
  /**
   * layer 实例
   */
  public abstract readonly layer: ILayer;
  /**
   * layer 名称
   */
  public abstract readonly name: string;
  /**
   * layer 类型
   */
  public abstract readonly type: LayerType | string;
  /**
   * layer 是否具有交互效果，用于 tooltip
   */
  public abstract readonly interaction: boolean;

  public pickLayerConfig<T extends PlotLayerConfig>(params: T): Partial<ILayerConfig> {
    const config = pick<any>(params, LayerConfigkeys);
    return config;
  }

  public addTo(scene: Scene) {
    scene.addLayer(this.layer);
  }

  public remove(scene: Scene) {
    scene.removeLayer(this.layer);
  }

  public abstract updateOptions(options: Partial<O>): void;

  protected setSource(source: SourceOptions | Source) {
    if (source instanceof Source) {
      this.layer.setSource(source);
    } else {
      const { data, aggregation, ...option } = source;
      aggregation && MappingSource.aggregation(option, aggregation);
      this.layer.source(data, option);
    }
  }

  public changeData(source: SourceOptions | Source) {
    this.setSource(source);
  }

  public show() {
    this.layer.show();
  }

  public hide() {
    this.layer.hide();
  }

  public toggleVisible() {
    this.layer.isVisible() ? this.layer.hide() : this.layer.show();
  }

  public fitBounds(fitBoundsOptions?: unknown) {
    this.layer.fitBounds(fitBoundsOptions);
  }

  /**
   * 事件代理: 绑定事件
   */
  public on(name: string, callback: (...args: any[]) => void) {
    this.layer.on(name, callback);
  }

  /**
   * 事件代理: 绑定一次事件
   */
  public once(name: string, callback: (...args: any[]) => void) {
    this.layer.once(name, callback);
  }

  /**
   * 事件代理: 解绑事件
   */
  public off(name: string, callback?: (...args: any[]) => void) {
    // eslint-disable-next-line
    // @ts-ignore
    this.layer.off(name, callback);
  }
}
