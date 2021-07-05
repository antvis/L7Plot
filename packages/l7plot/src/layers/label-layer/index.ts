import { uniqueId } from '@antv/util';
import { ILayer } from '@antv/l7-core';
import { PointLayer } from '@antv/l7-layers';
import { BaseLayerWrapper } from '../../core/layer/base-layer';
import { ILabelLayerConfig } from '../../core/layer/interface';
import { deepAssign } from '../../utils';
import { mappingLayer } from './adaptor';
import { ILabelLayerOptions } from './interface';

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

    mappingLayer(this.layer, this.options);

    this.layer.setSource(source);
  }

  public updateOptions(options: ILabelLayerConfig) {
    this.options = deepAssign({}, this.options, options);
    mappingLayer(this.layer, this.options);
  }
}
