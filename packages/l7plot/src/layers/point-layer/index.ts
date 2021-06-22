import { uniqueId } from '@antv/util';
import { ILayer } from '@antv/l7-core';
import { PointLayer as PLayer } from '@antv/l7-layers';
import { BaseLayerWrapper } from '../../core/layer/base-layer';
import { IPointLayerConfig } from '../../core/layer/interface';
import { deepAssign } from '../../utils';
import { mappingLayer } from './adaptor';
import { IPointLayerOptions } from './interface';

const Point_DEFAULT_OPTIONS = {
  name: 'pointLayer',
};

export class PointLayerWrapper extends BaseLayerWrapper<IPointLayerOptions> {
  public layer: ILayer;
  public options: IPointLayerOptions;

  constructor(options: IPointLayerOptions) {
    super();
    const { name, source } = options;
    const layerName = name ? name : uniqueId(Point_DEFAULT_OPTIONS.name);
    this.options = deepAssign({}, Point_DEFAULT_OPTIONS, options);

    const config = this.pickLayerConfig(this.options);
    this.layer = new PLayer({ ...config, name: layerName });

    mappingLayer(this.layer, this.options);

    this.layer.setSource(source);
  }

  public updateOption(options: IPointLayerConfig) {
    this.options = deepAssign({}, this.options, options);
    mappingLayer(this.layer, this.options);
  }
}
