import { IconFontLayerOptions } from './types';
import { DEFAULT_OPTIONS } from './constants';
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
    const scene = this.scene;
    scene?.addFontFace(fontFamily, fontPath);
    scene?.addIconFonts(iconFonts);
  }
}
