import { uniqueId, clone, isEqual, isUndefined } from '@antv/util';
import { PolygonLayer, LineLayer } from '@antv/l7';
import { PlotLayer } from '../../core/layer/plot-layer';
import { getDefaultState, mappingLayer } from './adaptor';
import { AreaLayerOptions, AreaLayerSourceOptions } from './types';
import { ILayer, MouseEvent, Scene, Source } from '../../types';
import { getColorLegendItems } from '../dot-layer/helper';

export type { AreaLayerOptions };

const DEFAULT_OPTIONS = {
  visible: true,
  state: {
    active: false,
    select: false,
  },
  enabledMultiSelect: false,
};
const LAYER_OPTIONS_KEYS = ['color', 'style', 'state', 'enabledMultiSelect'];

export class AreaLayer extends PlotLayer<AreaLayerOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 图层配置项 Keys
   */
  static LayerOptionsKeys = PlotLayer.LayerConfigkeys.concat(LAYER_OPTIONS_KEYS);
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
   * 高亮描边图层
   */
  public highlightLayer: ILayer;
  /**
   * 高亮描边数据
   */
  private highlightLayerData: any;
  /**
   * 选中填充面图层
   */
  public selectFillLayer: ILayer;
  /**
   * 选中描边图层
   */
  public selectStrokeLayer: ILayer;
  /**
   * 选中数据
   */
  private selectData: { feature: any; featureId: number }[] = [];
  /**
   * 图层类型
   */
  public type = PlotLayer.LayerType.AreaLayer;
  /**
   * 图层是否具有交互属性
   */
  public interaction = true;

  constructor(options: AreaLayerOptions) {
    super(options);
    const { name, source, visible, minZoom, maxZoom, zIndex = 0 } = this.options;
    const config = this.pickLayerConfig(this.options);
    const defaultState = getDefaultState(this.options.state);

    this.name = name ? name : uniqueId(this.type);
    this.layer = new PolygonLayer({ ...config, name: this.name });
    this.strokeLayer = new LineLayer({ name: 'strokeLayer', visible, zIndex, minZoom, maxZoom });

    this.highlightLayer = new LineLayer({
      name: 'highlightLayer',
      visible: visible && Boolean(defaultState.active.stroke),
      zIndex: zIndex + 0.1,
      minZoom,
      maxZoom,
    });
    this.selectFillLayer = new PolygonLayer({
      name: 'selectFillLayer',
      visible: visible && Boolean(defaultState.select.fill),
      zIndex: zIndex + 0.1,
      minZoom,
      maxZoom,
    });
    this.selectStrokeLayer = new LineLayer({
      name: 'selectStrokeLayer',
      visible: visible && Boolean(defaultState.select.stroke),
      zIndex: zIndex + 0.1,
      minZoom,
      maxZoom,
    });

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
    mappingLayer(
      this.layer,
      this.strokeLayer,
      this.highlightLayer,
      this.selectFillLayer,
      this.selectStrokeLayer,
      options,
    );
  }

  protected setSource(source: AreaLayerSourceOptions | Source) {
    super.setSource(source);
    this.setStrokeLayerSource();
    this.setHighlightLayerSource();
    this.selectFillLayer.source({ type: 'FeatureCollection', features: [] }, { parser: { type: 'geojson' } });
    this.selectStrokeLayer.source({ type: 'FeatureCollection', features: [] }, { parser: { type: 'geojson' } });
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

  protected setHighlightLayerSource(feature?: any, featureId = -999) {
    if (this.highlightLayerData === featureId) {
      return;
    }
    const features = feature ? [feature] : [];
    if (this.highlightLayer.getSource()) {
      this.highlightLayer.setData({ type: 'FeatureCollection', features }, { parser: { type: 'geojson' } });
    } else {
      this.highlightLayer.source({ type: 'FeatureCollection', features: [] }, { parser: { type: 'geojson' } });
    }
    this.highlightLayerData = featureId;
  }

  protected setSelectLayerSource(selectData: any[] = []) {
    if (
      this.selectData.length === selectData.length &&
      isEqual(
        this.selectData.map(({ featureId }) => featureId),
        selectData.map(({ featureId }) => featureId),
      )
    ) {
      return;
    }
    const features = selectData.map(({ feature }) => feature);
    this.selectFillLayer.setData({ type: 'FeatureCollection', features }, { parser: { type: 'geojson' } });
    this.selectStrokeLayer.setData({ type: 'FeatureCollection', features }, { parser: { type: 'geojson' } });
    this.selectData = selectData;
  }

  private initEvent() {
    this.layer.off('mousemove', this.onHighlighHandle);
    this.layer.off('unmousemove', this.onHighlighHandle);
    this.layer.off('click', this.onSelectHandle);
    this.selectData = [];
    this.highlightLayerData = null;
    if (!this.options.state) return;
    // active
    if (this.options.state.active) {
      this.layer.on('mousemove', this.onHighlighHandle);
      this.layer.on('unmousemove', this.onUnhighlighHandle);
    }
    // select
    if (this.options.state.select) {
      this.layer.on('click', this.onSelectHandle);
    }
  }

  private onHighlighHandle = (event: MouseEvent) => {
    const { feature, featureId } = event;
    this.setHighlightLayerSource(feature, featureId);
  };

  private onUnhighlighHandle = () => {
    this.setHighlightLayerSource();
  };

  private onSelectHandle = (event: MouseEvent) => {
    const enabledMultiSelect = this.options.enabledMultiSelect;
    const { feature, featureId } = event;
    let selectData = clone(this.selectData);
    const index = selectData.findIndex((item) => item.featureId === featureId);

    if (index === -1) {
      if (enabledMultiSelect) {
        selectData.push({ feature, featureId });
      } else {
        selectData = [{ feature, featureId }];
      }
      this.emit('select', feature, clone(selectData));
    } else {
      const unselectFeature = selectData[index];
      if (enabledMultiSelect) {
        selectData.splice(index, 1);
      } else {
        selectData = [];
      }
      this.emit('unselect', unselectFeature, clone(selectData));
    }

    this.setSelectLayerSource(selectData);
  };

  public addTo(scene: Scene) {
    scene.addLayer(this.layer);
    scene.addLayer(this.strokeLayer);
    scene.addLayer(this.highlightLayer);
    scene.addLayer(this.selectFillLayer);
    scene.addLayer(this.selectStrokeLayer);
  }

  public remove(scene: Scene) {
    scene.removeLayer(this.layer);
    scene.removeLayer(this.strokeLayer);
    scene.removeLayer(this.highlightLayer);
    scene.removeLayer(this.selectFillLayer);
    scene.removeLayer(this.selectStrokeLayer);
  }

  public update(options: Partial<AreaLayerOptions>) {
    super.update(options);
    this.mappingLayer(this.options);

    if (this.options.visible) {
      if (!isUndefined(options.state) && !isEqual(this.lastOptions.state, this.options.state)) {
        this.updateHighlightLayer();
      }
      const defaultState = getDefaultState(this.options.state);
      if (defaultState.active.stroke) {
        this.setHighlightLayerSource();
      }
      if (defaultState.select.fill || defaultState.select.stroke) {
        this.setSelectLayerSource();
      }
    }

    this.initEvent();
  }

  private updateHighlightLayer() {
    const defaultState = getDefaultState(this.options.state);
    const lasetDefaultState = getDefaultState(this.lastOptions.state);

    if (lasetDefaultState.active.stroke !== defaultState.active.stroke) {
      defaultState.active.stroke ? this.highlightLayer.show() : this.highlightLayer.hide();
    }

    if (lasetDefaultState.select.fill !== defaultState.select.fill) {
      defaultState.select.fill ? this.selectFillLayer.show() : this.selectFillLayer.hide();
    }

    if (lasetDefaultState.select.stroke !== defaultState.select.stroke) {
      defaultState.select.stroke ? this.selectStrokeLayer.show() : this.selectStrokeLayer.hide();
    }
  }

  public setIndex(zIndex: number) {
    this.layer.setIndex(zIndex);
    this.strokeLayer.setIndex(zIndex);
    this.highlightLayer.setIndex(zIndex + 0.1);
    this.selectFillLayer.setIndex(zIndex + 0.1);
    this.selectStrokeLayer.setIndex(zIndex + 0.1);
  }

  public setMinZoom(minZoom: number) {
    this.layer.setMinZoom(minZoom);
    this.strokeLayer.setMinZoom(minZoom);
    this.highlightLayer.setMinZoom(minZoom);
    this.selectFillLayer.setMinZoom(minZoom);
    this.selectStrokeLayer.setMinZoom(minZoom);
  }

  public setMaxZoom(maxZoom: number) {
    this.layer.setMaxZoom(maxZoom);
    this.strokeLayer.setMaxZoom(maxZoom);
    this.highlightLayer.setMaxZoom(maxZoom);
    this.selectFillLayer.setMaxZoom(maxZoom);
    this.selectStrokeLayer.setMaxZoom(maxZoom);
  }

  public show() {
    if (!this.layer.inited) return;
    this.layer.show();
    this.strokeLayer.show();
    this.selectFillLayer.show();
    this.selectStrokeLayer.show();
  }

  public hide() {
    if (!this.layer.inited) return;
    this.layer.hide();
    this.strokeLayer.hide();
    this.selectFillLayer.hide();
    this.selectStrokeLayer.hide();
  }

  public getColorLegendItems() {
    const colorLegendItems = this.layer.getLegendItems('color');
    if (Array.isArray(colorLegendItems) && colorLegendItems.length !== 0) {
      const items = getColorLegendItems(colorLegendItems);
      return items;
    }

    return [];
  }

  public setActive(id: number) {
    // TODO: L7 method pickFeature(id|{x,y})
  }

  public setSelect(id: number) {
    // TODO: L7 method pickFeature(id|{x,y})
  }
}
