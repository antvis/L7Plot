import { uniqueId } from '@antv/util';
import { PolygonLayer } from '@antv/l7-layers';
import { BaseLayerWrapper } from '../../core/layer/base-layer';
import { deepAssign } from '../../utils';
import { mappingLayer } from './adaptor';
import { IPolygonLayerOptions } from './interface';
import { ILayer } from '../../types';

const Polygon_DEFAULT_OPTIONS = {
  name: 'polygonLayer',
};

export class PolygonLayerWrapper<O extends IPolygonLayerOptions = IPolygonLayerOptions> extends BaseLayerWrapper<O> {
  public layer: ILayer;
  public options: O;

  constructor(options: O) {
    super();
    const { name, source } = options;
    const layerName = name ? name : uniqueId(Polygon_DEFAULT_OPTIONS.name);
    this.options = deepAssign({}, Polygon_DEFAULT_OPTIONS, options);

    const config = this.pickLayerConfig(this.options);
    this.layer = new PolygonLayer({ ...config, name: layerName });

    this.mappingLayer(this.layer, this.options);
    this.layer.setSource(source);
  }

  mappingLayer(layer: ILayer, options: O) {
    mappingLayer(layer, options);
  }

  public updateOptions(options: Partial<O>) {
    this.options = deepAssign({}, this.options, options);
    this.mappingLayer(this.layer, this.options);
  }
}
