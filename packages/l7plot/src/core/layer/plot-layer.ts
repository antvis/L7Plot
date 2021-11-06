import { pick } from '@antv/util';
import Source from '@antv/l7-source';
import EventEmitter from '@antv/event-emitter';
import { LayerType, IPLotLayer, PlotLayerConfig } from '../../types/layer';
import { Scene, ILayer, ILayerConfig, SourceOptions } from '../../types';
import { MappingSource } from '../../adaptor/source';
import { LayerEventList } from '../map/constants';
import { deepAssign } from '../../utils';

const LayerConfigkeys = ['name', 'zIndex', 'visible', 'minZoom', 'maxZoom', 'pickingBuffer', 'autoFit', 'blend'];

export abstract class PlotLayer<O extends PlotLayerConfig> extends EventEmitter implements IPLotLayer {
  /**
   * 地图图表类型
   */
  static LayerType = LayerType;
  /**
   * layer 的 schema 配置
   */
  public options: O;
  /**
   * layer 上一次的 schema 配置
   */
  public lastOptions: O;
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

  constructor(options: O) {
    super();
    this.options = deepAssign({}, this.getDefaultOptions(), options);
    this.lastOptions = this.options;
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<O> {
    return {};
  }

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

  public abstract update(options: Partial<O>): void;

  /**
   * 更新: 更新配置
   */
  public updateOption(options: Partial<O>) {
    this.lastOptions = this.options;
    this.options = deepAssign({}, this.options, options);
  }

  public render() {
    this.layer.renderLayers();
  }

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
    this.isVisible() ? this.hide() : this.show();
  }

  public isVisible() {
    return this.layer.inited ? this.layer.isVisible() : this.options.visible;
  }

  public fitBounds(fitBoundsOptions?: unknown) {
    this.layer.fitBounds(fitBoundsOptions);
  }

  /**
   * 事件代理: 绑定事件
   */
  public on(name: string, callback: (...args: any[]) => void) {
    if (LayerEventList.indexOf(name) !== -1) {
      this.layer.on(name, callback);
    } else {
      super.on(name, callback);
    }
    return this;
  }

  /**
   * 事件代理: 绑定一次事件
   */
  public once(name: string, callback: (...args: any[]) => void) {
    if (LayerEventList.indexOf(name) !== -1) {
      this.layer.once(name, callback);
    } else {
      super.once(name, callback);
    }
    return this;
  }

  /**
   * 事件代理: 解绑事件
   */
  public off(name: string, callback: (...args: any[]) => void) {
    if (LayerEventList.indexOf(name) !== -1) {
      this.layer.off(name, callback);
    } else {
      super.off(name, callback);
    }
    return this;
  }
}
