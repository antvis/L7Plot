import { ILayer } from '@antv/l7-core';
import { LineLayer } from '@antv/l7-layers';
import { uniqueId } from '@antv/util';
import { MappingLayer } from '../../adaptor/layer';
import { BaseLayerWrapper } from '../../core/layer/base-layer';
import { deepAssign } from '../../utils';
import { ILineLayerOptions } from './interface';

const LINE_DEFAULT_OPTIONS = {
  name: 'lineLayer',
};

function mappingLayer(layer: ILayer, options: ILineLayerOptions) {
  const { shape, size, color, scale, animate, style } = options;

  shape && MappingLayer.shape(layer, shape);
  size && MappingLayer.size(layer, size);
  color && MappingLayer.color(layer, color);
  scale && MappingLayer.scale(layer, scale);
  animate && MappingLayer.animate(layer, animate);
  style && MappingLayer.style(layer, style);
}

export class LineLayerWrapper<O extends ILineLayerOptions = ILineLayerOptions> extends BaseLayerWrapper<O> {
  public layer: ILayer;
  public options: O;

  constructor(options: O) {
    super();
    const { name, source } = options;
    const layerName = name ? name : uniqueId(LINE_DEFAULT_OPTIONS.name);
    this.options = deepAssign({}, LINE_DEFAULT_OPTIONS, options);

    const config = this.pickLayerConfig(this.options);
    this.layer = new LineLayer({ ...config, name: layerName });

    mappingLayer(this.layer, this.options);
    this.layer.setSource(source);
  }
  public updateOptions(options: Partial<O>) {
    this.options = deepAssign({}, this.options, options);
  }
}
