import { PointLayer as L7PointLayer } from '@antv/l7';
import { CoreLayer } from '../../core/core-layer';
import { ILayer } from '../../types';
import { TextLayerOptions } from './types';

/**
 * 文本图层
 * 对应 L7 的 PointLayer
 **/
export class TextLayer extends CoreLayer<TextLayerOptions> {
  public type = 'textLayer';

  /**
   * 创建图层
   */
  protected createLayer(): ILayer {
    const config = this.getLayerConfig();
    const layer = new L7PointLayer(config);

    return layer;
  }

  /**
   * 适配属性配置
   */
  protected adaptorAttrOptions(options: TextLayerOptions) {
    const { field, style = {} } = this.options;
    const { fill: color, fontSize: size } = style || {};
    const shape = { field, value: 'text' };

    return { shape, color, size, ...options };
  }
}
