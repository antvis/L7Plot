import { uniqueId } from '@antv/util';
import { PointLayer } from '@antv/l7-layers';
import { BaseLayerWrapper } from '../../core/layer/base-layer';
import { ILabelLayerConfig } from '../../core/layer/interface';
import { deepAssign } from '../../utils';
import { mappingLayer } from './adaptor';
import { ILabelLayerOptions } from './interface';
import { ILayer } from '../../types';

const LABEL_DEFAULT_OPTIONS = {
  name: 'labelLayer',
  style: {
    fontSize: 12,
  },
};

export class LabelLayerWrapper extends BaseLayerWrapper<ILabelLayerOptions> {
  public layer: ILayer;
  public options: ILabelLayerOptions;

  constructor(options: ILabelLayerOptions) {
    super();
    const { name, source } = options;
    const layerName = name ? name : uniqueId(LABEL_DEFAULT_OPTIONS.name);
    this.options = deepAssign({}, LABEL_DEFAULT_OPTIONS, options);

    const config = this.pickLayerConfig(this.options);
    this.layer = new PointLayer({ ...config, name: layerName });

    this.mappingLayer(this.layer, this.options);
    this.layer.setSource(source);
  }

  mappingLayer(layer: ILayer, options: ILabelLayerOptions) {
    mappingLayer(layer, options);
  }

  public updateOptions(options: ILabelLayerConfig) {
    this.options = deepAssign({}, this.options, options);
    this.mappingLayer(this.layer, this.options);
  }
}
