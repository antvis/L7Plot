import { pick } from '@antv/util';
import { ILayer, ILayerConfig } from '@antv/l7-core';
import Source from '@antv/l7-source';
import { IBaseLayerConfig, IBaseLayerWrapper } from './interface';

const LayerConfigkeys = ['name', 'zIndex', 'visible', 'minZoom', 'maxZoom', 'pickingBuffer', 'autoFit', 'blend'];

export abstract class BaseLayerWrapper<O extends IBaseLayerConfig> implements IBaseLayerWrapper {
  public abstract layer: ILayer;
  public abstract options: O;

  public pickLayerConfig<T extends IBaseLayerConfig>(params: T): Partial<ILayerConfig> {
    const config = pick<any>(params, LayerConfigkeys);
    return config;
  }

  public abstract updateOption<T>(options: T);

  public changeData(source: Source) {
    this.layer.setSource(source);
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
}
