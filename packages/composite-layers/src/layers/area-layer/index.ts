import { clone, isEqual, isUndefined } from '@antv/util';
import { PolygonLayer, LineLayer } from '@antv/l7-layers';
import { CompositeLayer } from '../../core/composite-layer';
import { getDefaultState, mappingLayersAttr } from './adaptor';
import { AreaLayerOptions, AreaLayerSourceOptions } from './types';
import { ILayer, MouseEvent, Source } from '../../types';
import { DEFAULT_OPTIONS } from './constants';

export type { AreaLayerOptions };

export class AreaLayer extends CompositeLayer<AreaLayerOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 复合图层类型
   */
  public type = CompositeLayer.LayerType.AreaLayer;
  /**
   * 主图层 填充面图层实例
   */
  public get layer() {
    return this.subLayers.getLayer('fillLayer') as ILayer;
  }
  /**
   * 描边图层
   */
  public get strokeLayer() {
    return this.subLayers.getLayer('strokeLayer') as ILayer;
  }
  /**
   * 高亮描边图层
   */
  public get highlightLayer() {
    return this.subLayers.getLayer('highlightLayer') as ILayer;
  }
  /**
   * 高亮描边数据
   */
  private highlightLayerData: any;
  /**
   * 选中填充面图层
   */
  public get selectFillLayer() {
    return this.subLayers.getLayer('selectFillLayer') as ILayer;
  }
  /**
   * 选中描边图层
   */
  public get selectStrokeLayer() {
    return this.subLayers.getLayer('selectStrokeLayer') as ILayer;
  }
  /**
   * 选中数据
   */
  private selectData: { feature: any; featureId: number }[] = [];
  /**
   * 图层是否具有交互属性
   */
  public interaction = true;

  constructor(options: AreaLayerOptions) {
    super(options);
    this.initSubLayersEvent();
  }

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<AreaLayerOptions> {
    return AreaLayer.DefaultOptions;
  }

  /**
   * 创建子图层
   */
  protected createSubLayers() {
    const { state } = this.options;
    const baseConfig = this.pickLayerBaseConfig();
    const { visible, minZoom, maxZoom, zIndex = 0 } = baseConfig;
    const defaultState = getDefaultState(state);

    const fillLayer = new PolygonLayer({ ...baseConfig, name: 'fillLayer' });
    const strokeLayer = new LineLayer({ name: 'strokeLayer', visible, zIndex, minZoom, maxZoom });
    const highlightLayer = new LineLayer({
      name: 'highlightLayer',
      visible: visible && Boolean(defaultState.active.stroke),
      zIndex: zIndex + 0.1,
      minZoom,
      maxZoom,
    });
    const selectFillLayer = new PolygonLayer({
      name: 'selectFillLayer',
      visible: visible && Boolean(defaultState.select.fill),
      zIndex: zIndex + 0.1,
      minZoom,
      maxZoom,
    });
    const selectStrokeLayer = new LineLayer({
      name: 'selectStrokeLayer',
      visible: visible && Boolean(defaultState.select.stroke),
      zIndex: zIndex + 0.1,
      minZoom,
      maxZoom,
    });

    const subLayers = [fillLayer, strokeLayer, highlightLayer, selectFillLayer, selectStrokeLayer];

    return subLayers;
  }

  /**
   * 映射子图层属性
   */
  protected adaptorSubLayersAttr() {
    mappingLayersAttr(
      this.layer,
      this.strokeLayer,
      this.highlightLayer,
      this.selectFillLayer,
      this.selectStrokeLayer,
      this.options
    );
  }

  /**
   * 设置子图层数据
   */
  protected setSubLayersSource(source: AreaLayerSourceOptions | Source) {
    super.setSubLayersSource(source);
    this.setStrokeLayerSource();
    this.setHighlightLayerSource();
    this.selectFillLayer.source({ type: 'FeatureCollection', features: [] }, { parser: { type: 'geojson' } });
    this.selectStrokeLayer.source({ type: 'FeatureCollection', features: [] }, { parser: { type: 'geojson' } });
  }

  /**
   * 设置描边子图层数据
   */
  protected setStrokeLayerSource() {
    const layerSource = this.layer.getSource();
    if (layerSource) {
      this.strokeLayer.setSource(layerSource);
    } else {
      const { data, options } = this.layer.sourceOption;
      this.strokeLayer.source(data, options);
    }
  }

  /**
   * 设置高亮描边子图层数据
   */
  protected setHighlightLayerSource(feature?: any, featureId = -999) {
    if (this.highlightLayerData === featureId) {
      return;
    }
    const features = feature ? [feature] : [];
    this.highlightLayer.setData({ type: 'FeatureCollection', features }, { parser: { type: 'geojson' } });
    this.highlightLayerData = featureId;
  }

  /**
   * 设置选中描边与填充子图层数据
   */
  protected setSelectLayerSource(selectData: any[] = []) {
    if (
      this.selectData.length === selectData.length &&
      isEqual(
        this.selectData.map(({ featureId }) => featureId),
        selectData.map(({ featureId }) => featureId)
      )
    ) {
      return;
    }
    const features = selectData.map(({ feature }) => feature);
    this.selectFillLayer.setData({ type: 'FeatureCollection', features }, { parser: { type: 'geojson' } });
    this.selectStrokeLayer.setData({ type: 'FeatureCollection', features }, { parser: { type: 'geojson' } });
    this.selectData = selectData;
  }

  /**
   * 初始化子图层事件
   */
  protected initSubLayersEvent() {
    // 初始化主图层交互事件
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

  /**
   * 图层高亮回调
   */
  private onHighlighHandle = (event: MouseEvent) => {
    const { feature, featureId } = event;
    this.setHighlightLayerSource(feature, featureId);
  };

  /**
   * 图层取消高亮回调
   */
  private onUnhighlighHandle = () => {
    this.setHighlightLayerSource();
  };

  /**
   * 图层选中回调
   */
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

  /**
   * 更新
   */
  public update(options: Partial<AreaLayerOptions>) {
    super.update(options);

    this.adaptorSubLayersAttr();

    if (this.options.visible) {
      this.updateHighlightSubLayers(this.options);
    }

    this.initSubLayersEvent();
  }

  /**
   * 更新高亮及选中子图层
   */
  private updateHighlightSubLayers(options: Partial<AreaLayerOptions>) {
    const defaultState = getDefaultState(this.options.state);

    // 更新是否开启高亮与选中子图层
    if (!isUndefined(options.state) && !isEqual(this.lastOptions.state, this.options.state)) {
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

    // 更新之后清除旧数据
    if (defaultState.active.stroke) {
      this.setHighlightLayerSource();
    }
    if (defaultState.select.fill || defaultState.select.stroke) {
      this.setSelectLayerSource();
    }
  }

  public setIndex(zIndex: number) {
    this.layer.setIndex(zIndex);
    this.strokeLayer.setIndex(zIndex);
    this.highlightLayer.setIndex(zIndex + 0.1);
    this.selectFillLayer.setIndex(zIndex + 0.1);
    this.selectStrokeLayer.setIndex(zIndex + 0.1);
  }

  public setActive(id: number) {
    // TODO: L7 method pickFeature(id|{x,y})
  }

  public setSelect(id: number) {
    // TODO: L7 method pickFeature(id|{x,y})
  }
}
