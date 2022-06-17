import { CompositeLayer, CompositeEventEnum } from '../../core/composite-layer';
import { TextLayer } from '../../core-layers/text-layer';
import { PointLayer } from '../../core-layers/point-layer';
import { LabelService } from '../common/service/label';
import { IconImageLayerOptions } from './types';
import { getDefaultState } from './adaptor';
import { DEFAULT_OPTIONS, DEFAULT_STATE, EMPTY_SOURCE } from './constants';
import { ICoreLayer, ISource, MouseEvent } from '../../types';
import { IconLayer } from './icon';
export class IconImageLayer extends IconLayer<IconImageLayerOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 初始化资源
   */
  protected initAssets() {
    if (this.scene) {
      this.loadIconAtlas();
    } else {
      this.once(CompositeEventEnum.ONADD, () => {
        this.loadIconAtlas();
      });
    }
  }

  /**
   * load 图片资源
   * @returns
   */
  protected loadIconAtlas() {
    const iconAtlas = this.options.iconAtlas;
    const scene = this.scene;

    Object.keys(iconAtlas).forEach((icon: string) => {
      scene?.addImage(icon, iconAtlas[icon]);
    });
  }
}
