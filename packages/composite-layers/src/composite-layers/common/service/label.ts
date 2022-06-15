import { isUndefined } from '@antv/util';
import { TextLayer } from '../../../core-layers/text-layer';
import { CompositeLayer } from '../../../core/composite-layer';
import { ILayerService } from './ILayerService';
export class LabelService implements ILayerService {
  private parent: CompositeLayer<any>;
  private layer: TextLayer | undefined;
  private type = 'labelLayer';
  private zIndexOffset = 0.1;
  constructor(parent: CompositeLayer<any>) {
    this.parent = parent;
  }

  public getLayerOptions() {
    const { visible, minZoom, maxZoom, zIndex = 0, label } = this.parent.options;
    const labelVisible = visible && Boolean(label) && (isUndefined(label?.visible) || label?.visible);
    const options = {
      zIndex: zIndex + this.zIndexOffset,
      minZoom,
      maxZoom,
      ...label,
      visible: labelVisible,
    };

    return options;
  }
  public createLayer(id?: string) {
    const layer = new TextLayer({
      ...this.getLayerOptions(),
      id: id || this.type,
      source: this.parent.source,
    }) as TextLayer;
    this.layer = layer;
    return layer;
  }

  public updateLayer() {
    this.layer?.update(this.getLayerOptions());
  }
}
