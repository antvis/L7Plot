import { IconFontLayerOptions } from './types';
import { Scene } from '../../types';
import { DEFAULT_OPTIONS } from './constants';
import { IconLayer } from './icon';
import { CompositeLayerEvent } from '../../core/constants';

export class IconFontLayer extends IconLayer<IconFontLayerOptions> {
  private fontLoaded = true;
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 添加到场景
   */
  public addTo(scene: Scene) {
    this.scene = scene;
    this.initAssets();
    if (this.fontLoaded) {
      this.subLayers.addTo(scene);
      this.emit(CompositeLayerEvent.ADD);
    } else {
      this.on('fontloaded', () => {
        this.subLayers.addTo(scene);
        this.emit(CompositeLayerEvent.ADD);
      });
    }
  }

  /**
   * 初始化资源
   */
  protected initAssets() {
    this.loadIconFontAtlas();
  }

  /**
   * load 字体资源
   */
  protected loadIconFontAtlas() {
    const { fontFamily, fontPath, iconFonts } = this.options.iconAtlas;
    const scene = this.scene;
    if (fontFamily && fontPath) {
      this.fontLoaded = false;
      scene?.once('fontloaded', (e) => {
        this.emit('fontloaded', e);
        this.fontLoaded = true;
      });
      scene?.addFontFace(fontFamily, fontPath);
    }

    scene?.addIconFonts(iconFonts);
  }
}
