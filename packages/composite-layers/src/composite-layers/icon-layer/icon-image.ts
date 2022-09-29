import { IconImageLayerOptions } from './types';
import { DEFAULT_OPTIONS } from './constants';
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
    this.loadIconAtlas();
  }

  /**
   * load 图片资源
   */
  protected loadIconAtlas() {
    const iconAtlas = this.options.iconAtlas;
    const scene = this.scene;

    Object.keys(iconAtlas).forEach((icon: string) => {
      scene?.addImage(icon, iconAtlas[icon]);
    });
  }
  /**
   * 增加iconAtlas
   * @param iconAtlas
   */
  public addIconAtlas(iconAtlas: { [key: string]: string }[]) {
    const scene = this.scene;

    Object.keys(iconAtlas).forEach((icon: string) => {
      scene?.addImage(icon, iconAtlas[icon]);
    });
  }
}
