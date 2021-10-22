import { uniqueId } from '@antv/util';
import { PolygonLayer, LineLayer } from '@antv/l7-layers';
import { PlotLayer } from '../../core/layer/plot-layer';
import { deepAssign } from '../../utils';
import { mappingLayer } from './adaptor';
import { AreaLayerOptions, AreaLayerSourceOptions } from './types';
import { ILayer, MouseEvent, Scene, Source } from '../../types';
import { getColorLegendItems } from '../dot-layer/helper';

export type { AreaLayerOptions };

const DEFAULT_OPTIONS = {
  state: {
    active: true,
  },
};
const LAYER_OPTIONS_KEYS = ['autoFit', 'color', 'style', 'state'];

export class AreaLayer extends PlotLayer<AreaLayerOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 图层配置项 Keys
   */
  static LayerOptionsKeys = LAYER_OPTIONS_KEYS;
  /**
   * 图层配置项
   */
  public options: AreaLayerOptions;
  /**
   * 图层名称
   */
  public name: string;
  /**
   * 填充面图层实例
   */
  public layer: ILayer;
  /**
   * 描边图层
   */
  public strokeLayer: ILayer;
  /**
   * 高亮图层
   */
  public highlightLayer: ILayer;
  /**
   * 图层类型
   */
  public type = PlotLayer.LayerType.AreaLayer;
  /**
   * 图层是否具有交互属性
   */
  public interaction = true;

  constructor(options: AreaLayerOptions) {
    super();
    const { name, source } = options;
    this.name = name ? name : uniqueId(this.type);
    this.options = deepAssign({}, this.getDefaultOptions(), options);

    const config = this.pickLayerConfig(this.options);
    this.layer = new PolygonLayer({ ...config, name: this.name });
    this.strokeLayer = new LineLayer({ name: 'strokeLayer' });
    this.highlightLayer = new LineLayer({ name: 'highlightLayer' });

    this.mappingLayer(this.options);
    this.setSource(source);
    this.initEvent();
  }

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<AreaLayerOptions> {
    return DEFAULT_OPTIONS;
  }

  private mappingLayer(options: AreaLayerOptions) {
    mappingLayer(this.layer, this.strokeLayer, this.highlightLayer, options);
  }

  protected setSource(source: AreaLayerSourceOptions | Source) {
    super.setSource(source);
    this.setStrokeLayerSource();
    this.highlightLayer.source({ type: 'FeatureCollection', features: [] });
  }

  protected setStrokeLayerSource() {
    const layerSource = this.layer.getSource();
    if (layerSource) {
      this.strokeLayer.setSource(layerSource);
    } else {
      const { data, options } = this.layer.sourceOption;
      this.strokeLayer.source(data, options);
    }
  }

  protected setHighlightLayerSource(feature?: any) {
    const features = feature ? [feature] : [];
    this.highlightLayer.setData({ type: 'FeatureCollection', features });
  }

  private initEvent() {
    if (!this.options.state) return;
    // active
    // if (this.options.state.active) {
    //   this.layer.on('mousemove', (event: IMouseEvent) => {
    //     this.setHighlightLayerSource(event.feature);
    //   });
    // }
    // select
    // if (this.options.state.select) {
    //   this.layer.on('click', (event: IMouseEvent) => {
    //     this.setHighlightLayerSource(event.feature);
    //   });
    //   this.layer.on('unclick', () => {
    //     this.setHighlightLayerSource();
    //   });
    // }
  }

  public addTo(scene: Scene) {
    scene.addLayer(this.layer);
    scene.addLayer(this.strokeLayer);
    scene.addLayer(this.highlightLayer);
  }

  public remove(scene: Scene) {
    scene.removeLayer(this.layer);
    scene.removeLayer(this.strokeLayer);
    scene.removeLayer(this.highlightLayer);
  }

  public updateOptions(options: Partial<AreaLayerOptions>) {
    this.options = deepAssign({}, this.options, options);
    this.mappingLayer(this.options);
  }

  public show() {
    this.layer.show();
    this.strokeLayer.show();
  }

  public hide() {
    this.layer.hide();
    this.strokeLayer.hide();
  }

  public toggleVisible() {
    this.layer.isVisible() ? this.layer.hide() : this.layer.show();
    this.strokeLayer.isVisible() ? this.strokeLayer.hide() : this.strokeLayer.show();
  }

  public getColorLegendItems() {
    const colorLegendItems = this.layer.getLegendItems('color');
    if (Array.isArray(colorLegendItems) && colorLegendItems.length !== 0) {
      const items = getColorLegendItems(colorLegendItems);
      return items;
    }

    return [];
  }
}
