import { uniqueId } from '@antv/util';
import { PointLayer } from '@antv/l7-layers';
import { BaseLayer } from '../../core/layer/base-layer';
import { ILabelLayerConfig } from '../../types/layer';
import { deepAssign } from '../../utils';
import { mappingLayer } from './adaptor';
import { ILabelLayerOptions } from './interface';
import { ILayer } from '../../types';

const DEFAULT_OPTIONS = {
  style: {
    fontSize: 12,
  },
};

export class LabelLayer extends BaseLayer<ILabelLayerOptions> {
  public options: ILabelLayerOptions;
  public name: string;
  public layer: ILayer;
  public type = 'labelLayer';
  public interaction = false;

  constructor(options: ILabelLayerOptions) {
    super();
    const { name, source } = options;
    this.name = name ? name : uniqueId(this.type);
    this.options = deepAssign({}, DEFAULT_OPTIONS, options);

    const config = this.pickLayerConfig(this.options);
    this.layer = new PointLayer({ ...config, name: this.name });

    this.mappingLayer(this.layer, this.options);
    this.setSource(source);
  }

  protected mappingLayer(layer: ILayer, options: ILabelLayerOptions) {
    mappingLayer(layer, options);
  }

  public updateOptions(options: ILabelLayerConfig) {
    this.options = deepAssign({}, this.options, options);
    this.mappingLayer(this.layer, this.options);
  }
}
