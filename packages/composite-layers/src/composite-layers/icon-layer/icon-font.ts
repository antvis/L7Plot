import { CompositeLayer } from '../../core/composite-layer';
import { TextLayer } from '../../core-layers/text-layer';
import { PointLayer } from '../../core-layers/point-layer';
import { LabelService } from '../common/service/label';
import { IconFontLayerOptions } from './types';
import { getDefaultState } from './adaptor';
import { DEFAULT_OPTIONS, DEFAULT_STATE } from './constants';
import { ICoreLayer, ISource, MouseEvent } from '../../types';
import { IconLayer } from './icon';
import { CompositeLayerEvent } from '../../core/constants';

export class IconFontLayer extends IconLayer<IconFontLayerOptions> {
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
      this.once(CompositeLayerEvent.ADD, () => {
        this.loadIconAtlas();
      });
    }
  }

  /**
   * load 图片资源
   */
  protected loadIconAtlas() {
    const { fontFamily, fontPath, iconFonts } = this.options.iconAtlas;
    const scene = this.scene!;
    scene.addFontFace(fontFamily, fontPath);
    scene.addIconFonts(iconFonts);
  }
}
