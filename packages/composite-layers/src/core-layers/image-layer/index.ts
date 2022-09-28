import { ImageLayer as L7ImageLayer } from '@antv/l7-layers';
import { CoreLayer } from '../../core/core-layer';
import { ILayer } from '../../types';
import { ImageLayerOptions } from './types';

/**
 * 图片图层
 * 对应 L7 的 ImageLayer
 **/
export class ImageLayer extends CoreLayer<ImageLayerOptions> {
  public type = 'imageLayer';

  /**
   * 创建图层
   */
  protected createLayer(): ILayer {
    const config = this.getLayerConfig();
    const layer = new L7ImageLayer(config);

    return layer;
  }
}
