import { PointLayer as L7PointLayer } from '@antv/l7';
import { CoreLayer } from '../../core/core-layer';
import { ILayer } from '../../types';
import { PointLayerOptions } from './types';

/**
 * 点图层
 * 对应 L7 的 PointLayer
 **/
export class PointLayer extends CoreLayer<PointLayerOptions> {
  public type = 'pointLayer';

  /**
   * 创建图层
   */
  protected createLayer(): ILayer {
    const config = this.getLayerConfig();
    const layer = new L7PointLayer(config);

    return layer;
  }
}
