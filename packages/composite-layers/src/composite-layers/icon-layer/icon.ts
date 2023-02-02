import { clone, isEqual, isUndefined, omit } from '@antv/util';
import { PointLayer } from '../../core-layers/point-layer';
import { TextLayer } from '../../core-layers/text-layer';
import { CompositeLayer } from '../../core/composite-layer';
import { CompositeLayerEvent } from '../../core/constants';
import { BlendType, ICoreLayer, ISource, MouseEvent, Scene } from '../../types';
import { EMPTY_JSON_SOURCE } from '../common/constants';
import { getLabelLayerOptions } from '../common/label-layer';
import { isGestureMultiSelect } from '../common/multi-select';
import { getDefaultState } from './adaptor';
import { DEFAULT_OPTIONS, DEFAULT_STATE } from './constants';
import { IconLayerActiveOptions, IconLayerOptions, IconLayerSourceOptions } from './types';

export abstract class IconLayer<T extends IconLayerOptions> extends CompositeLayer<T> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 图层交互状态配置
   */
  protected layerState = DEFAULT_STATE;
  /**
   * 复合图层类型
   */
  public type = CompositeLayer.LayerType.IconImageLayer;
  /**
   * 主图层
   */
  protected get layer() {
    return this.iconLayer;
  }
  /**
   * 图标图层
   */
  protected get iconLayer() {
    return this.subLayers.getLayer('iconLayer') as ICoreLayer;
  }
  /**
   * 标注文本图层
   */
  public get iconLabelLayer() {
    return this.subLayers.getLayer('labelLayer') as TextLayer;
  }
  /**
   * 选中数据
   */
  private selectData: { feature: any; featureId: number }[] = [];
  /**
   * 选中填充面图层
   */
  public get selectIconLayer() {
    return this.subLayers.getLayer('selectIconLayer') as ICoreLayer;
  }

  constructor(options: T) {
    super(options);
    this.initSubLayersEvent();
  }

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<IconLayerOptions> {
    return IconLayer.DefaultOptions;
  }

  /**
   * 初始化资源
   */
  protected abstract initAssets(): void;

  /**
   * 添加到场景
   */
  public addTo(scene: Scene) {
    this.scene = scene;
    this.initAssets();
    this.subLayers.addTo(scene);
    this.emit(CompositeLayerEvent.ADD);
  }

  /**
   * 获取图标图层配置项
   */
  private getIconLayerOptions() {
    const {
      visible,
      minZoom,
      maxZoom,
      zIndex = 0,
      radius,
      opacity,
      icon,
      fillColor,
      iconStyle,
      ...baseConfig
    } = omit<any>(this.options, ['source']) as Omit<T, 'source'>;
    const fillState = {
      active: this.options.state?.active,
      select: false, // 主图层默认关闭 select
    };
    const fillStyle = {
      opacity: opacity,
      ...iconStyle,
    };
    const options = {
      ...baseConfig,
      visible,
      minZoom,
      maxZoom,
      zIndex,
      shape: icon,
      size: radius,
      state: fillState,
      color: fillColor,
      style: fillStyle,
    };

    return options;
  }

  private getHighLightLayerOptions() {
    const { visible, minZoom, maxZoom, zIndex = 0, icon } = this.options;
    const selectState = this.layerState?.select as IconLayerActiveOptions;
    const { radius = 5, opacity = 1 } = selectState;
    const fillStyle = { opacity: opacity };

    const option = {
      visible: visible,
      blend: BlendType.normal,
      zIndex: zIndex + 0.1,
      minZoom,
      maxZoom,
      source: EMPTY_JSON_SOURCE,
      size: radius,
      style: fillStyle,
      shape: selectState?.icon || icon,
      state: { select: false, active: false },
    };

    return option;
  }

  /**
   * 图层选中回调
   */
  private onSelectHandle = (event: MouseEvent) => {
    const { feature, featureId } = event;
    this.handleSelectData(featureId, feature);
  };

  private handleSelectData(featureId: number, feature: any, isSelfMultiSelect?: boolean) {
    const { enabledMultiSelect, triggerMultiSelectKey } = this.options;
    const isMultiSelect = isGestureMultiSelect(enabledMultiSelect, triggerMultiSelectKey) || isSelfMultiSelect;
    let selectData = clone(this.selectData);
    const index = selectData.findIndex((item) => item.featureId === featureId);

    if (index === -1) {
      if (isMultiSelect) {
        selectData.push({ feature, featureId });
      } else {
        selectData = [{ feature, featureId }];
      }
      this.emit('select', feature, clone(selectData));
    } else {
      const unselectFeature = selectData[index];
      if (isMultiSelect) {
        selectData.splice(index, 1);
      } else {
        selectData = [];
      }
      this.emit('unselect', unselectFeature, clone(selectData));
    }

    this.setSelectLayerSource(selectData);
  }

  protected createSubLayers(): ICoreLayer[] {
    const source = this.source;
    this.layerState = getDefaultState(this.options.state);
    // 映射图标图层
    const iconLayer = new PointLayer({
      ...this.getIconLayerOptions(),
      id: 'iconLayer',
      source,
      interaction: true,
    });
    // 选中效果
    const selectLayer = new PointLayer({
      id: 'selectIconLayer',
      ...this.getHighLightLayerOptions(),
    });
    // 文本标注
    const labelLayer = new TextLayer({
      ...getLabelLayerOptions<IconLayerOptions>(this.options),
      id: 'labelLayer',
      source,
    });
    const subLayers = [iconLayer, labelLayer, selectLayer];

    return subLayers;
  }

  protected updateSubLayers() {
    this.iconLayer.update(this.getIconLayerOptions(), false);
    this.iconLabelLayer.update(getLabelLayerOptions<IconLayerOptions>(this.options), false);
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
    const parser = this.source.parser;
    const data = parser.type === 'geojson' ? { type: 'FeatureCollection', features } : features;
    this.selectIconLayer.changeData({ data, parser });
    this.selectData = selectData;
  }

  /**
   * 设置子图层数据
   */
  protected setSubLayersSource(source: IconLayerSourceOptions | ISource) {
    if (this.isSourceInstance(source)) {
      this.source = source;
      this.iconLayer.setSource(source);
      this.iconLabelLayer.setSource(source);
    } else {
      const { data, ...option } = source;
      this.source.setData(data, option);
    }

    this.selectIconLayer.changeData(EMPTY_JSON_SOURCE);
  }

  protected initSubLayersEvent() {
    this.iconLayer.off('click', this.onSelectHandle);
    this.selectData = [];
    if (!this.options.state) return;
    // active

    // select
    if (this.options.state.select) {
      this.iconLayer.on('click', this.onSelectHandle);
    }
  }
  /**
   * 更新: 更新配置
   */
  public updateOption(options: Partial<T>) {
    super.updateOption(options);
    this.layerState = getDefaultState(this.options.state);
  }

  public setIndex(zIndex: number) {
    this.iconLayer.setIndex(zIndex);
    this.iconLabelLayer.setIndex(zIndex);
    this.selectIconLayer.setIndex(zIndex + 0.1);
  }

  /**
   * 设置图层高亮状态
   */
  public setActive(field: string, value: number | string) {
    const source = this.iconLayer.source;
    const featureId = source.getFeatureId(field, value);
    if (isUndefined(featureId)) {
      console.warn(`Feature non-existent by field: ${field},value: ${value}`);
      return;
    }
    this.iconLayer.layer.setActive(featureId);
  }

  /**
   * 更新
   */
  public update(options: Partial<T>) {
    super.update(options);

    this.initSubLayersEvent();
  }

  /**
   * 设置图层选中状态
   */
  public setSelect(field: string, value: number | string) {
    const source = this.iconLayer.source;
    const featureId = source.getFeatureId(field, value);
    if (isUndefined(featureId)) {
      console.warn(`Feature non-existent by field: ${field},value: ${value}`);
      return;
    }

    if (this.layerState?.select && (this.layerState?.select as IconLayerActiveOptions).enable !== false) {
      return;
    }

    const feature = source.getFeatureById(featureId);
    this.handleSelectData(featureId, feature, true);
    // TODO: L7 method pickFeature(id|{x,y})
  }

  /**
   * 图层框选数据
   */
  public boxSelect(bounds: [number, number, number, number], callback: (...args: any[]) => void) {
    this.iconLayer.boxSelect(bounds, callback);
  }
}
