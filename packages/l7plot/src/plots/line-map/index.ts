import { ILayer } from '@antv/l7-core';
import Source from '@antv/l7-source';
import { LayerGroup } from '../../core/layer/layer-group';
import { MapWrapper } from '../../core/map';
import { LineMapOptions } from './interface';
import { LineLayerWrapper } from '../../layers/line-layer';
import { pick } from '@antv/util';

export const LINE_LAYER_OPTIONS_KEYS = ['autoFit', 'shape', 'color', 'size', 'style', 'scale', 'animate'];

export class LineMap<O extends LineMapOptions = LineMapOptions> extends MapWrapper<O> {
  public type = MapWrapper.MapType.Line;
  protected lineLayerWrapper!: LineLayerWrapper;

  protected interactionLayers = [this.lineLayerWrapper.layer];

  protected beforeCreateLayers(options: O) {
    const lineLayerConfig = { name: 'lineLayer' };

    return { lineLayerConfig };
  }

  protected createLayers(source: Source): LayerGroup {
    const { lineLayerConfig } = this.beforeCreateLayers(this.options);
    this.lineLayerWrapper = new LineLayerWrapper({
      source,
      ...pick<any>(this.options, LINE_LAYER_OPTIONS_KEYS),
      ...lineLayerConfig,
    });
    const layerGroup = new LayerGroup([this.lineLayerWrapper.layer]);

    return layerGroup;
  }

  protected updateLayers(options: Partial<O>): void {
    const pointLayerConfig = pick<any>(options, LINE_LAYER_OPTIONS_KEYS);
    this.lineLayerWrapper.updateOptions(pointLayerConfig);
  }
}
