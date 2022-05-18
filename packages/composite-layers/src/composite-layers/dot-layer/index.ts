import { clone, isEqual, isUndefined } from '@antv/util';
import Source from '@antv/l7-source';
import { CompositeLayer } from '../../core/composite-layer';
import { PointLayer } from '../../core-layers/point-layer';
import { TextLayer } from '../../core-layers/text-layer';
import { ICoreLayer, ISource, SourceOptions, MouseEvent } from '../../types';
import { getDefaultState } from './adaptor';
import { DEFAULT_OPTIONS, DEFAULT_STATE } from './constants';
import { EMPTY_SOURCE } from '../area-layer/constants';
import { DotLayerOptions } from './types';

export type { DotLayerOptions };

export class DotLayer extends CompositeLayer<DotLayerOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 复合图层类型
   */
  public type = CompositeLayer.LayerType.DotLayer;
  /**
   * 主图层
   */
  protected get layer() {
    return this.fillLayer;
  }
  /**
   * 填充图层
   */
  public get fillLayer() {
    return this.subLayers.getLayer('fillLayer') as ICoreLayer;
  }
  /**
   * 高亮描边图层
   */
  public get highlightStrokeLayer() {
    return this.subLayers.getLayer('highlightStrokeLayer') as ICoreLayer;
  }
  /**
   * 高亮数据
   */
  private highlightData: any;
  /**
   * 选中填充面图层
   */
  public get selectFillLayer() {
    return this.subLayers.getLayer('selectFillLayer') as ICoreLayer;
  }
  /**
   * 选中描边图层
   */
  public get selectStrokeLayer() {
    return this.subLayers.getLayer('selectStrokeLayer') as ICoreLayer;
  }
  /**
   * 选中数据
   */
  private selectData: { feature: any; featureId: number }[] = [];
  /**
   * 标注文本图层
   */
  public get labelLayer() {
    return this.subLayers.getLayer('labelLayer') as ICoreLayer;
  }
  /**
   * 图层交互状态配置
   */
  private layerState = DEFAULT_STATE;
  /**
   * 图层是否具有交互属性
   */
  public interaction = true;

  constructor(options: DotLayerOptions) {
    super(options);
    this.initSubLayersEvent();
  }

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<DotLayerOptions> {
    return DotLayer.DefaultOptions;
  }

  /**
   * 创建子图层
   */
  protected createSubLayers() {
    this.layerState = getDefaultState(this.options.state);
    const sourceOptions = this.options.source;
    const source = sourceOptions instanceof Source ? sourceOptions : this.createSource(sourceOptions);

    // 映射填充图层
    const fillLayer = new PointLayer({
      name: 'fillLayer',
      shape: 'circle',
      ...this.getFillLayerOptions(),
      source,
    });

    // 高亮描边图层
    const highlightStrokeLayer = new PointLayer({
      name: 'highlightStrokeLayer',
      ...this.gethigHlightStrokeLayerOptions(),
    });

    // 选中填充图层
    const selectFillLayer = new PointLayer({
      name: 'selectFillLayer',
      ...this.getSelectFillLayerOptions(),
    });

    // 选中描边图层
    const selectStrokeLayer = new PointLayer({
      name: 'selectStrokeLayer',
      ...this.getSelectStrokeLayerOptions(),
    });

    // 标注图层
    const labelLayer = new TextLayer({
      name: 'labelLayer',
      ...this.getTextLayerOptions(),
      source,
    });

    const subLayers = [fillLayer, highlightStrokeLayer, selectFillLayer, selectStrokeLayer, labelLayer];

    return subLayers;
  }

  private getFillLayerOptions() {
    const { visible, minZoom, maxZoom, zIndex = 0, color, size, style, ...baseConfig } = this.options;
    const defaultState = this.layerState;

    const fillState = {
      active: defaultState.active.fill === false ? false : { color: defaultState.active.fill },
      select: false,
    };
    const fillStyle = {
      opacity: style?.opacity,
      stroke: style?.stroke,
      strokeOpacity: style?.lineOpacity,
      strokeWidth: style?.lineWidth,
    };

    const options = {
      ...baseConfig,
      visible,
      minZoom,
      maxZoom,
      zIndex,
      color,
      size,
      state: fillState,
      style: fillStyle,
    };

    return options;
  }

  private gethigHlightStrokeLayerOptions() {
    const { visible, minZoom, maxZoom, zIndex = 0, size } = this.options;
    const defaultState = this.layerState;
    const strokeStyle = {
      opacity: 0,
      stroke: defaultState.active.stroke || undefined,
      strokeOpacity: defaultState.active.lineOpacity,
      strokeWidth: defaultState.active?.lineWidth,
    };

    const options = {
      visible: visible && Boolean(defaultState.active.stroke),
      zIndex: zIndex + 0.1,
      minZoom,
      maxZoom,
      source: EMPTY_SOURCE,
      size,
      style: strokeStyle,
    };

    return options;
  }

  private getSelectFillLayerOptions() {
    const { visible, minZoom, maxZoom, zIndex = 0, size, style } = this.options;
    const defaultState = this.layerState;
    const color = defaultState.select.fill || undefined;
    const fillStyle = { opacity: style?.opacity };

    const option = {
      visible: visible && Boolean(defaultState.select.fill),
      zIndex: zIndex + 0.1,
      minZoom,
      maxZoom,
      source: EMPTY_SOURCE,
      color,
      size,
      style: fillStyle,
      state: { select: false, active: false },
    };

    return option;
  }

  private getSelectStrokeLayerOptions() {
    const { visible, minZoom, maxZoom, zIndex = 0, size } = this.options;
    const defaultState = this.layerState;
    const strokeStyle = {
      opacity: 0,
      stroke: defaultState.select.stroke || undefined,
      strokeOpacity: defaultState.select.lineOpacity,
      strokeWidth: defaultState.select.lineWidth,
    };

    const option = {
      visible: visible && Boolean(defaultState.select.fill),
      zIndex: zIndex + 0.1,
      minZoom,
      maxZoom,
      source: EMPTY_SOURCE,
      size,
      style: strokeStyle,
    };

    return option;
  }

  private getTextLayerOptions() {
    const { visible, minZoom, maxZoom, zIndex = 0, label } = this.options;
    const options = {
      zIndex: zIndex + 0.1,
      minZoom,
      maxZoom,
      ...label,
      visible: visible && (label?.visible || Boolean(label)),
    };

    return options;
  }

  /**
   * 设置子图层数据
   */
  protected setSubLayersSource(source: SourceOptions | ISource) {
    if (source instanceof Source) {
      this.fillLayer.setSource(source);
      this.labelLayer.setSource(source);
    } else {
      const layerSource = this.fillLayer.source;
      const { data, ...option } = source;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      layerSource.setData(data, option);
    }

    this.highlightStrokeLayer.changeData(EMPTY_SOURCE);
    this.selectFillLayer.changeData(EMPTY_SOURCE);
    this.selectStrokeLayer.changeData(EMPTY_SOURCE);
  }

  /**
   * 设置高亮描边子图层数据
   */
  protected setHighlightLayerSource(feature?: any, featureId = -999) {
    if (this.highlightData === featureId) {
      return;
    }
    const features = feature ? [feature] : [];
    this.highlightStrokeLayer.changeData({
      data: { type: 'FeatureCollection', features },
      parser: { type: 'geojson' },
    });
    this.highlightData = featureId;
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
    this.selectFillLayer.changeData({ data: { type: 'FeatureCollection', features }, parser: { type: 'geojson' } });
    this.selectStrokeLayer.changeData({ data: { type: 'FeatureCollection', features }, parser: { type: 'geojson' } });
    this.selectData = selectData;
  }

  /**
   * 初始化子图层事件
   */
  protected initSubLayersEvent() {
    // 初始化主图层交互事件
    this.fillLayer.off('mousemove', this.onHighlighHandle);
    this.fillLayer.off('unmousemove', this.onHighlighHandle);
    this.fillLayer.off('click', this.onSelectHandle);
    this.selectData = [];
    this.highlightData = null;
    if (!this.options.state) return;
    // active
    if (this.options.state.active) {
      this.fillLayer.on('mousemove', this.onHighlighHandle);
      this.fillLayer.on('unmousemove', this.onUnhighlighHandle);
    }
    // select
    if (this.options.state.select) {
      this.fillLayer.on('click', this.onSelectHandle);
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
    const { feature, featureId } = event;
    this.handleSelectData(featureId, feature);
  };

  private handleSelectData(featureId: number, feature: any) {
    const enabledMultiSelect = this.options.enabledMultiSelect;
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
  }

  /**
   * 更新
   */
  public update(options: Partial<DotLayerOptions>) {
    super.update(options);

    this.initSubLayersEvent();
  }

  /**
   * 更新: 更新配置
   */
  public updateOption(options: Partial<DotLayerOptions>) {
    super.update(options);
    this.layerState = getDefaultState(this.options.state);
  }

  /**
   * 更新子图层
   */
  protected updateSubLayers(options: Partial<DotLayerOptions>) {
    // 映射填充面图层
    this.fillLayer.update(this.getFillLayerOptions());

    // 高亮图层
    this.highlightStrokeLayer.update(this.gethigHlightStrokeLayerOptions());

    // 选中填充图层
    this.selectFillLayer.update(this.getSelectFillLayerOptions());

    // 选中描边图层
    this.selectStrokeLayer.update(this.getSelectStrokeLayerOptions());

    // 重置高亮/选中状态
    if (this.options.visible) {
      if (!isUndefined(options.state) && !isEqual(this.lastOptions.state, this.options.state)) {
        this.updateHighlightSubLayers();
      }

      if (this.layerState.active.stroke) {
        this.setHighlightLayerSource();
      }
      if (this.layerState.select.fill || this.layerState.select.stroke) {
        this.setSelectLayerSource();
      }
    }
  }

  /**
   * 更新高亮及选中子图层
   */
  private updateHighlightSubLayers() {
    const defaultState = this.layerState;
    const lasetDefaultState = getDefaultState(this.lastOptions.state);

    if (lasetDefaultState.active.stroke !== defaultState.active.stroke) {
      defaultState.active.stroke ? this.highlightStrokeLayer.show() : this.highlightStrokeLayer.hide();
    }

    if (lasetDefaultState.select.fill !== defaultState.select.fill) {
      defaultState.select.fill ? this.selectFillLayer.show() : this.selectFillLayer.hide();
    }

    if (lasetDefaultState.select.stroke !== defaultState.select.stroke) {
      defaultState.select.stroke ? this.selectStrokeLayer.show() : this.selectStrokeLayer.hide();
    }
  }

  public setIndex(zIndex: number) {
    this.fillLayer.setIndex(zIndex);
    this.highlightStrokeLayer.setIndex(zIndex + 0.1);
    this.selectFillLayer.setIndex(zIndex + 0.1);
    this.selectStrokeLayer.setIndex(zIndex + 0.1);
    this.labelLayer.setIndex(zIndex + 0.1);
  }

  public setActive(field: string, value: number | string) {
    const source = this.fillLayer.source;
    const featureId = source.getFeatureId(field, value);
    if (isUndefined(featureId)) {
      throw new Error('Feature non-existent' + field + value);
    }

    if (this.layerState.active.fill) {
      this.fillLayer.layer.setActive(featureId);
    }

    if (this.layerState.active.stroke) {
      const feature = source.getFeatureById(featureId);
      this.setHighlightLayerSource(feature, featureId);
    }
  }

  public setSelect(field: string, value: number | string) {
    const source = this.fillLayer.source;
    const featureId = source.getFeatureId(field, value);
    if (isUndefined(featureId)) {
      throw new Error('Feature non-existent' + field + value);
    }

    if (this.layerState.select.stroke === false || this.layerState.select.fill === false) {
      return;
    }

    const feature = source.getFeatureById(featureId);
    this.handleSelectData(featureId, feature);
  }

  public boxSelect(bounds: [number, number, number, number], callback: (...args: any[]) => void) {
    this.fillLayer.boxSelect(bounds, callback);
  }
}
