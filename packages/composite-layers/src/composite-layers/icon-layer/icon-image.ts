import { IconImageLayerOptions } from './types';
import { DEFAULT_OPTIONS } from './constants';
import { IconLayer } from './icon';
import { Scene } from '../../types';
import { CompositeLayerEvent } from '../../core/constants';
import { CompositeLayer } from '../../core/composite-layer';

export class IconImageLayer extends IconLayer<IconImageLayerOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 复合图层类型
   */
  public type = CompositeLayer.LayerType.IconImageLayer;

  /**
   * 添加到场景
   */
  public addTo(scene: Scene) {
    this.scene = scene;
    this.initAssets().then(() => {
      this.subLayers.addTo(scene);
      this.emit(CompositeLayerEvent.ADD);
    });
  }

  /**
   * 初始化资源
   */
  protected async initAssets() {
    await this.loadIconAtlas();
  }

  /**
   * load 图片资源
   */
  protected async loadIconAtlas() {
    const iconAtlas = this.options.iconAtlas;
    const scene = this.scene;
    await Promise.all(
      Object.keys(iconAtlas).map(async (icon: string) => {
        await scene?.addImage(icon, iconAtlas[icon]);
      })
    );
  }
}
