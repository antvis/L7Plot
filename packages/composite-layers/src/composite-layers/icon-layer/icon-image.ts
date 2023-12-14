import { isEqual } from 'lodash-es';
import { CompositeLayer } from '../../core/composite-layer';
import { CompositeLayerEvent, LayerGroupEvent } from '../../core/constants';
import { Scene } from '../../types';
import { DEFAULT_OPTIONS } from './constants';
import { IconLayer } from './icon';
import { IconImageLayerOptions } from './types';

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
      this.subLayers.once(LayerGroupEvent.INITED_LAYERS, () => {
        this.emit(CompositeLayerEvent.INITED, this);
        this.emit(CompositeLayerEvent.ADD, this);
      });
      this.subLayers.addTo(scene);
    });
  }

  /**
   * 初始化资源
   */
  protected async initAssets() {
    await this.loadIconAtlas();
  }

  /**
   * 更新资源
   */
  private async updateAssets() {
    await this.loadIconAtlas();
  }

  protected updateSubLayers(options: Partial<IconImageLayerOptions>) {
    // 资源发生更新时
    if (options.iconAtlas && !isEqual(options.iconAtlas, this.lastOptions.iconAtlas)) {
      this.updateAssets().then(() => {
        super.updateSubLayers(options);
      });
    } else {
      super.updateSubLayers(options);
    }
  }

  /**
   * load 图片资源
   */
  protected async loadIconAtlas() {
    const iconAtlas = this.options.iconAtlas;
    const scene = this.scene;
    if (!scene) return;

    // 过滤已经加载到 scene 上的图标
    const images = Object.entries(iconAtlas).filter(([imageName]) => scene.hasImage(imageName) === false);
    await Promise.all(images.map(async ([imageName, imageUrl]) => await scene.addImage(imageName, imageUrl)));
  }
}
