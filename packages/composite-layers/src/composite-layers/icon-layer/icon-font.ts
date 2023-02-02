import { CompositeLayer } from '../../core/composite-layer';
import { CompositeLayerEvent, LayerGroupEvent } from '../../core/constants';
import { Scene } from '../../types';
import { DEFAULT_OPTIONS } from './constants';
import { IconLayer } from './icon';
import { IconFontLayerOptions } from './types';

export class IconFontLayer extends IconLayer<IconFontLayerOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 复合图层类型
   */
  public type = CompositeLayer.LayerType.IconFontLayer;
  /**
   * 字体是否加载完成
   */
  private fontLoaded = true;

  /**
   * 添加到场景
   */
  public addTo(scene: Scene) {
    this.scene = scene;
    this.initAssets();
    const callback = () => {
      this.subLayers.once(LayerGroupEvent.INITED_LAYERS, () => {
        this.emit(CompositeLayerEvent.INITED, this);
        this.emit(CompositeLayerEvent.ADD, this);
      });
      this.subLayers.addTo(scene);
    };
    if (this.fontLoaded) {
      callback();
    } else {
      this.on('fontloaded', () => {
        callback();
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
