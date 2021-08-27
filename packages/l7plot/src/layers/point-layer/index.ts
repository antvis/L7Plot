import { uniqueId } from '@antv/util';
import { PointLayer } from '@antv/l7-layers';
import { BaseLayerWrapper } from '../../core/layer/base-layer';
import { deepAssign } from '../../utils';
import { mappingLayer } from './adaptor';
import { IPointLayerOptions } from './interface';
import { ILayer } from '../../types';

const Point_DEFAULT_OPTIONS = {
  name: 'pointLayer',
};

export class PointLayerWrapper<O extends IPointLayerOptions = IPointLayerOptions> extends BaseLayerWrapper<O> {
  public layer: ILayer;
  public options: O;

  constructor(options: O) {
    super();
    const { name, source } = options;
    const layerName = name ? name : uniqueId(Point_DEFAULT_OPTIONS.name);
    this.options = deepAssign({}, Point_DEFAULT_OPTIONS, options);

    const config = this.pickLayerConfig(this.options);
    this.layer = new PointLayer({ ...config, name: layerName });

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
