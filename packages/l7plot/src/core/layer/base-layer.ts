import { pick } from '@antv/util';
import Source from '@antv/l7-source';
import { IBaseLayer, IBaseLayerConfig } from '../../types/layer';
import { ILayer, ILayerConfig, ISource } from '../../types';
import { MappingSource } from '../../adaptor/source';

const LayerConfigkeys = ['name', 'zIndex', 'visible', 'minZoom', 'maxZoom', 'pickingBuffer', 'autoFit', 'blend'];

export abstract class BaseLayer<O extends IBaseLayerConfig> implements IBaseLayer {
  /**
   * layer 的 schema 配置
   */
  public abstract options: O;
  /**
   * layer 实例
   */
  public abstract layer: ILayer;
  /**
   * layer 名称
   */
  public abstract name: string;
  /**
   * layer 类型
   */
  public abstract type: string;
  /**
   * layer 是否具有交互效果，用于 tooltip
   */
  public abstract interaction: boolean;

  public pickLayerConfig<T extends IBaseLayerConfig>(params: T): Partial<ILayerConfig> {
    const config = pick<any>(params, LayerConfigkeys);
    return config;
  }

  public abstract updateOptions(options: Partial<O>): void;

  public setSource(source: ISource | Source) {
    if (source instanceof Source) {
      this.layer.setSource(source);
    } else {
      const { data, aggregation, ...option } = source;
      aggregation && MappingSource.aggregation(option, aggregation);
      this.layer.source(data, option);
    }
  }

  public changeData(source: ISource | Source) {
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
  public off(name: string, callback: (...args: any[]) => void) {
    this.layer.off(name, callback);
  }
}
