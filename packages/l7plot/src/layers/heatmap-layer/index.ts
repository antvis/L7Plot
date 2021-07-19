import { uniqueId } from '@antv/util';
import { ILayer } from '@antv/l7-core';
import { HeatmapLayer } from '@antv/l7-layers';
import { BaseLayerWrapper } from '../../core/layer/base-layer';
import { IPointLayerConfig } from '../../core/layer/interface';
import { deepAssign } from '../../utils';
import { mappingLayer } from './adaptor';
import { IHeatmapLayerOptions } from './interface';

const Point_DEFAULT_OPTIONS = {
  name: 'heatmapLayer',
};

export class HeatmapLayerWrapper extends BaseLayerWrapper<IHeatmapLayerOptions> {
  public layer: ILayer;
  public options: IHeatmapLayerOptions;

  constructor(options: IHeatmapLayerOptions) {
    super();
    const { name, source } = options;
    const layerName = name ? name : uniqueId(Point_DEFAULT_OPTIONS.name);
    this.options = deepAssign({}, Point_DEFAULT_OPTIONS, options);

    const config = this.pickLayerConfig(this.options);
    this.layer = new HeatmapLayer({ ...config, name: layerName });

    mappingLayer(this.layer, this.options);

    this.layer.setSource(source);
  }

  public updateOptions(options: IPointLayerConfig) {
    this.options = deepAssign({}, this.options, options);
    mappingLayer(this.layer, this.options);
  }
}
