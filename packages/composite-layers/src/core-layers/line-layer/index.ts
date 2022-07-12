import { LineLayer as L7LineLayer } from '@antv/l7-layers';
import { CoreLayer } from '../../core/core-layer';
import { ILayer } from '../../types';
import { LineLayerOptions } from './types';

/**
 * 线图层
 * 对应 L7 的 LineLayer
 **/
export class LineLayer extends CoreLayer<LineLayerOptions> {
  public type = 'lineLayer';

  /**
   * 创建图层
   */
  protected createLayer(): ILayer {
    const config = this.getLayerConfig();
    const layer = new L7LineLayer(config);

    return layer;
  }
}
