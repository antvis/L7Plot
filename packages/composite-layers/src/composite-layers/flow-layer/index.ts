import bbox from '@turf/bbox';
import bboxPolygon from '@turf/bbox-polygon';
import transformScale from '@turf/transform-scale';
import { debounce } from 'lodash-es';
import { LineLayer } from '../../core-layers/line-layer';
import { LineLayerOptions } from '../../core-layers/line-layer/types';
import { PointLayer } from '../../core-layers/point-layer';
import { PointLayerOptions } from '../../core-layers/point-layer/types';
import { TextLayer } from '../../core-layers/text-layer';
import { TextLayerOptions } from '../../core-layers/text-layer/types';
import { CompositeLayer } from '../../core/composite-layer';
import { OriginMouseLayerEventList } from '../../core/constants';
import { ICoreLayer, Scene } from '../../types';
import {
  DEFAULT_FLOW_LAYER_ACTIVE_OPTIONS,
  DEFAULT_FLOW_LAYER_SELECT_OPTIONS,
  DEFAULT_OPTIONS,
  EMPTY_CIRCLE_LAYER_SOURCE,
  EMPTY_LINE_LAYER_SOURCE,
} from './constants';
import { DataProvider } from './data';
import {
  ClusterFlow,
  ClusterLocation,
  FlowDataProviderState,
  FLowLayerActiveOptions,
  FlowLayerOptions,
  MapStatus,
} from './types';
import { getColorAttribute, getLineOffsetsAttribute, getOpacityColorAttribute, getSizeAttribute } from './utils';

export class FlowLayer extends CompositeLayer<FlowLayerOptions> {
  constructor(options: FlowLayerOptions) {
    super(options);
    this.initSubLayersEvent();
  }
  /**
   * 默认配置项
   */
  public static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 复合图层类型
   */
  public type = CompositeLayer.LayerType.FlowLayer;

  /**
   * 数据计算中心
   */
  public dataProvider = new DataProvider();

  /**
   * 数据计算中心状态管理
   */
  public dataProviderState!: FlowDataProviderState;

  /**
   * 当前地图匹配的层级
   */
  public matchZoom = 0;

  // public highlightData?: { locations: ClusterLocation[]; flows: ClusterFlow[] };

  // public selectData?: { locations: ClusterLocation[]; flows: ClusterFlow[] };

  protected get layer() {
    return this.lineLayer!;
  }

  public get circleLayer() {
    return this.subLayers?.getLayer('circleLayer');
  }

  public get lineLayer() {
    return this.subLayers?.getLayer('lineLayer');
  }

  public get locationNameLayer() {
    return this.subLayers?.getLayer('locationNameLayer');
  }

  public get circleHighlightLayer() {
    return this.subLayers?.getLayer('circleHighlightLayer');
  }

  public get circleSelectLayer() {
    return this.subLayers?.getLayer('circleSelectLayer');
  }

  public get lineHighlightLayer() {
    return this.subLayers?.getLayer('lineHighlightLayer');
  }

  public get lineSelectLayer() {
    return this.subLayers?.getLayer('lineSelectLayer');
  }

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<FlowLayerOptions> {
    return FlowLayer.DefaultOptions;
  }

  protected createSubLayers(): ICoreLayer[] {
    const circleLayer = new PointLayer({
      id: 'circleLayer',
      name: 'circleLayer',
      source: EMPTY_CIRCLE_LAYER_SOURCE,
    });

    const lineLayer = new LineLayer({
      id: 'lineLayer',
      name: 'lineLayer',
      source: EMPTY_LINE_LAYER_SOURCE,
    });

    const locationNameLayer = new TextLayer({
      id: 'locationNameLayer',
      name: 'locationNameLayer',
      source: EMPTY_CIRCLE_LAYER_SOURCE,
    });

    const circleHighlightLayer = new PointLayer({
      id: 'circleHighlightLayer',
      name: 'circleHighlightLayer',
      source: EMPTY_CIRCLE_LAYER_SOURCE,
    });

    const circleSelectLayer = new PointLayer({
      id: 'circleSelectLayer',
      name: 'circleSelectLayer',
      source: EMPTY_CIRCLE_LAYER_SOURCE,
    });

    const lineHighlightLayer = new LineLayer({
      id: 'lineHighlightLayer',
      name: 'lineHighlightLayer',
      source: EMPTY_LINE_LAYER_SOURCE,
    });

    const lineSelectLayer = new LineLayer({
      id: 'lineSelectLayer',
      name: 'lineSelectLayer',
      source: EMPTY_LINE_LAYER_SOURCE,
    });

    OriginMouseLayerEventList.forEach((eventName) => {
      circleLayer.on(eventName, (e) => this.emit(`circleLayer:${eventName}`, e));
      lineLayer.on(eventName, (e) => this.emit(`lineLayer:${eventName}`, e));
    });

    return [
      lineLayer,
      circleLayer,
      locationNameLayer,
      circleHighlightLayer,
      circleSelectLayer,
      lineHighlightLayer,
      lineSelectLayer,
    ];
  }

  /**
   * 更新
   */
  public update(options: Partial<FlowLayerOptions>) {
    super.update(options);
    this.initSubLayersEvent();
    if (options.source !== this.options.source) {
      this.clearActiveLayers();
    }
  }

  public addTo(scene: Scene) {
    this.scene = scene;
    this.updateSubLayers();
    super.addTo(scene);
    this.scene?.on('zoomchange', this.onMapChange);
    this.scene?.on('mapmove', this.onMapChange);
  }

  public remove() {
    super.remove();
    this.scene?.off('zoomchange', this.onMapChange);
    this.scene?.off('mapmove', this.onMapChange);
  }

  protected updateSubLayers() {
    this.updateClusterState();
    this.circleLayer?.update(this.getCircleLayerOptions());
    this.getLocationNameLayerOptions().then((options) => {
      this.locationNameLayer?.update(options);
    });
    // 保证 lineLayer 获取到的 scale 方法是最新的
    requestAnimationFrame(() => {
      this.lineLayer?.update(this.getLineLayerOptions());
      this.circleHighlightLayer?.update(this.getCircleHighlightLayerOptions());
      this.circleSelectLayer?.update(this.getCircleSelectLayerOptions());
      this.lineHighlightLayer?.update(this.getLineHighlightLayerOptions());
      this.lineSelectLayer?.update(this.getLineSelectLayerOptions());

      const { getAppropriateLevel } = this.dataProvider.getClusterIndex(this.options.source, this.dataProviderState);
      const matchZoom = getAppropriateLevel(this.dataProviderState.mapStatus.zoom)?.zoom ?? 0;

      if (matchZoom !== this.matchZoom) {
        this.clearActiveLayers();
        this.matchZoom = matchZoom;
      }
    });
  }

  protected initSubLayersEvent() {
    this.circleLayer?.off('mousemove', this.onCircleMouseMove);
    this.circleLayer?.off('mouseout', this.onCircleMouseOut);
    this.circleLayer?.off('click', this.onCircleClick);
    this.lineLayer?.off('mousemove', this.onLineMouseMove);
    this.lineLayer?.off('mouseout', this.onLineMouseOut);
    this.lineLayer?.off('click', this.onLineClick);

    if (this.options.state?.active) {
      this.circleLayer?.on('mousemove', this.onCircleMouseMove);
      this.circleLayer?.on('mouseout', this.onCircleMouseOut);
      this.lineLayer?.on('mousemove', this.onLineMouseMove);
      this.lineLayer?.on('mouseout', this.onLineMouseOut);
    }

    if (this.options.state?.select) {
      this.circleLayer?.on('click', this.onCircleClick);
      this.lineLayer?.on('click', this.onLineClick);
    }
  }

  protected onMapChange = debounce(
    () => {
      this.updateSubLayers();
    },
    400,
    {
      maxWait: 400,
    },
  );

  protected updateClusterState() {
    const scene = this.scene;
    if (!scene) {
      return;
    }
    const maxZoom = scene.getMaxZoom();
    const minZoom = scene.getMinZoom();

    const currentBoundPolygon = bboxPolygon(scene.getBounds().flat() as MapStatus['bounds']);
    // 将当前地图展示的区域扩大 10% 作为客流点线范围计算时的缓冲区
    const currentBoundPolygonScale = transformScale(currentBoundPolygon, 1.1);

    this.dataProviderState = {
      ...(this.options as Required<FlowLayerOptions>),
      mapStatus: {
        zoom: scene.getZoom(),
        bounds: bbox(currentBoundPolygonScale) as MapStatus['bounds'],
      },
      maxZoom,
      minZoom,
    };
  }

  protected getCircleLayerOptions(): PointLayerOptions {
    const {
      minZoom,
      maxZoom,
      zIndex,
      visible,
      blend,
      pickingBuffer,
      circleStrokeColor: stroke,
      circleStrokeWidth: strokeWidth,
      circleOpacity: opacity,
    } = this.options;
    const options: PointLayerOptions = {
      source: {
        data: [],
        parser: {
          type: 'json',
          x: 'lng',
          y: 'lat',
        },
      },
      shape: 'circle',
      minZoom,
      maxZoom,
      zIndex,
      visible,
      blend,
      pickingBuffer,
      style: {
        stroke,
        strokeWidth,
        opacity,
      },
    };
    if (this.dataProvider && this.scene) {
      const locationWeightRange = this.dataProvider.getLocationWeightRange(this.options.source, this.dataProviderState);
      options.source.data = this.dataProvider.getFilterLocations(this.options.source, this.dataProviderState);
      options.size = getSizeAttribute(this.options.circleRadius!, locationWeightRange);
      options.color = getColorAttribute(this.options.circleColor!, locationWeightRange);
    }

    return options;
  }

  protected getLineLayerOptions(): LineLayerOptions {
    const {
      minZoom,
      maxZoom,
      zIndex,
      visible,
      blend,
      pickingBuffer,
      lineOpacity,
      lineWidth,
      lineColor,
      lineStroke,
      lineStrokeOpacity,
      lineStrokeWidth,
    } = this.options;
    const options: LineLayerOptions = {
      source: {
        data: [],
        parser: {
          type: 'json',
          x: 'fromLng',
          y: 'fromLat',
          x1: 'toLng',
          y1: 'toLat',
        },
      },
      shape: 'flowline',
      minZoom,
      maxZoom,
      zIndex,
      visible,
      blend,
      pickingBuffer,
      style: {
        gapWidth: lineStrokeWidth,
        stroke: lineStroke,
        strokeWidth: lineStrokeWidth,
        strokeOpacity: lineStrokeOpacity,
        opacity: lineOpacity,
      },
    };
    if (this.dataProvider && this.scene) {
      const flowWeightRange = this.dataProvider.getFlowWeightRange(this.options.source, this.dataProviderState);
      const filterFlowWeightRange = this.dataProvider.getFilterFlowWeightRange(
        this.options.source,
        this.dataProviderState,
      );

      options.source.data = this.dataProvider.getFilterFlows(this.options.source, this.dataProviderState);
      options.size = getSizeAttribute(lineWidth!, flowWeightRange);
      options.color = getColorAttribute(lineColor!, flowWeightRange);

      if (this.options.fadeOpacityEnabled && options.style) {
        options.style.opacity = getOpacityColorAttribute(filterFlowWeightRange, this.options.fadeOpacityAmount!);
      }

      if (this.circleLayer && options.style) {
        const clusterIndex = this.dataProvider.getClusterIndex(this.options.source, this.dataProviderState);
        options.style.offsets = getLineOffsetsAttribute(clusterIndex, this.circleLayer as PointLayer);
      }
    }

    return options;
  }

  protected async getLocationNameLayerOptions(): Promise<TextLayerOptions> {
    const {
      minZoom,
      maxZoom,
      zIndex,
      visible,
      blend,
      pickingBuffer,
      showLocationName,
      getClusterLocationName,
      locationNameColor: fill,
      locationNameSize: fontSize,
      locationNameStroke: stroke,
      locationNameStrokeWidth: strokeWidth,
      locationNameStrokeOpacity: strokeOpacity,
      locationNameOffset: textOffset,
    } = this.options;

    const originSource = Object.assign(
      {},
      showLocationName ? this.circleLayer?.options['source'] ?? EMPTY_CIRCLE_LAYER_SOURCE : EMPTY_CIRCLE_LAYER_SOURCE,
    );

    if (getClusterLocationName) {
      originSource.data = await Promise.all(
        originSource.data.map(async (location, locationIndex) => {
          if (!location.name) {
            try {
              location.name = await getClusterLocationName(location, locationIndex);
            } catch (e) {
              location.name = '';
            }
          }
          return location;
        }),
      );
    }

    const options: TextLayerOptions = {
      source: originSource,
      field: 'name',
      minZoom,
      maxZoom,
      zIndex,
      visible,
      blend,
      pickingBuffer,
      style: {
        fill,
        fontSize,
        stroke,
        strokeOpacity,
        strokeWidth,
        textOffset,
      },
    };

    return options;
  }

  protected getCircleHighlightLayerOptions(): Omit<PointLayerOptions, 'source'> {
    return this._getCircleActiveLayerOptions(this._getFullActiveOptions());
  }

  protected getCircleSelectLayerOptions(): Omit<PointLayerOptions, 'source'> {
    return this._getCircleActiveLayerOptions(this._getFullSelectOptions());
  }

  protected getLineHighlightLayerOptions(): Omit<LineLayerOptions, 'source'> {
    return this._getLineActiveLayerOptions(this._getFullActiveOptions());
  }

  protected getLineSelectLayerOptions(): Omit<LineLayerOptions, 'source'> {
    return this._getLineActiveLayerOptions(this._getFullSelectOptions());
  }

  protected onCircleMouseMove = (e: any) => {
    this.renderHighlightLayers(this._getCircleLayerActiveData(e, this._getFullActiveOptions()));
  };

  protected onCircleMouseOut = () => {
    this.clearHighlightLayers();
  };

  protected onLineMouseMove = (e: any) => {
    this.renderHighlightLayers(this._getLineLayerActiveData(e, this._getFullActiveOptions()));
  };

  protected onLineMouseOut = () => {
    this.clearHighlightLayers();
  };

  protected onCircleClick = (e: any) => {
    if (e.feature.id !== this.circleSelectLayer?.options['source'].data?.[0]?.id) {
      this.renderSelectLayers(this._getCircleLayerActiveData(e, this._getFullSelectOptions()));
    } else {
      this.clearSelectLayers();
    }
  };

  protected onLineClick = (e: any) => {
    if (e.feature.id !== this.lineSelectLayer?.options['source'].data?.[0]?.id) {
      this.renderSelectLayers(this._getLineLayerActiveData(e, this._getFullSelectOptions()));
    } else {
      this.clearSelectLayers();
    }
  };

  protected renderHighlightLayers({ locations, flows }: { locations: ClusterLocation[]; flows: ClusterFlow[] }) {
    this.circleHighlightLayer?.update({
      source: {
        data: locations,
        parser: {
          type: 'json',
          x: 'lng',
          y: 'lat',
        },
      },
    });
    this.lineHighlightLayer?.update({
      source: {
        data: flows,
        parser: {
          type: 'json',
          x: 'fromLng',
          y: 'fromLat',
          x1: 'toLng',
          y1: 'toLat',
        },
      },
    });
  }

  protected renderSelectLayers({ locations, flows }: { locations: ClusterLocation[]; flows: ClusterFlow[] }) {
    this.circleSelectLayer?.update({
      source: {
        data: locations,
        parser: {
          type: 'json',
          x: 'lng',
          y: 'lat',
        },
      },
    });
    this.lineSelectLayer?.update({
      source: {
        data: flows,
        parser: {
          type: 'json',
          x: 'fromLng',
          y: 'fromLat',
          x1: 'toLng',
          y1: 'toLat',
        },
      },
    });
  }

  protected clearActiveLayers() {
    this.clearHighlightLayers();
    this.clearSelectLayers();
  }

  protected clearHighlightLayers() {
    this.renderHighlightLayers({
      locations: [],
      flows: [],
    });
  }

  protected clearSelectLayers() {
    this.renderSelectLayers({
      locations: [],
      flows: [],
    });
  }

  private _getCircleLayerActiveData(layerEvent: any, { enableCircleSpread }: FLowLayerActiveOptions) {
    const locationItem = layerEvent.feature as ClusterLocation;
    const { id: locationId } = locationItem;
    let flows: ClusterFlow[] = [];
    if (enableCircleSpread) {
      const filterFlows = this.dataProvider.getFilterFlows(this.options.source, this.dataProviderState);
      flows = filterFlows.filter((flow) => {
        return flow.fromId === locationId || flow.toId === locationId;
      });
    }
    return {
      locations: [locationItem],
      flows,
    };
  }

  private _getLineLayerActiveData(layerEvent: any, { enableLineSpread }: FLowLayerActiveOptions) {
    const flowItem = layerEvent.feature as ClusterFlow;
    const locations: ClusterLocation[] = [];
    const { fromId, toId } = flowItem;
    if (enableLineSpread) {
      const { clusterIdMap } = this.dataProvider.getClusterIndex(this.options.source, this.dataProviderState);
      const fromLocation = clusterIdMap.get(fromId);
      const toLocation = clusterIdMap.get(toId);
      if (fromLocation) {
        locations.push(fromLocation);
      }
      if (toLocation) {
        locations.push(toLocation);
      }
    }
    return {
      locations,
      flows: [flowItem],
    };
  }

  private _getFullActiveOptions(): FLowLayerActiveOptions {
    return {
      ...DEFAULT_FLOW_LAYER_ACTIVE_OPTIONS,
      ...(this.options.state?.active instanceof Object ? this.options.state?.active : {}),
    };
  }

  private _getFullSelectOptions(): FLowLayerActiveOptions {
    return {
      ...DEFAULT_FLOW_LAYER_SELECT_OPTIONS,
      ...(this.options.state?.select instanceof Object ? this.options.state?.select : {}),
    };
  }

  private _getCircleActiveLayerOptions({
    circleColor,
    circleStrokeColor,
  }: FLowLayerActiveOptions): Omit<PointLayerOptions, 'source'> {
    const { color, size, shape, style } = this.circleLayer?.options ?? {};
    return {
      color: circleColor ?? color,
      shape,
      size,
      style: {
        stroke: circleStrokeColor,
        strokeWidth: style.strokeWidth,
      },
    };
  }

  private _getLineActiveLayerOptions({
    lineColor,
    lineStroke,
  }: FLowLayerActiveOptions): Omit<LineLayerOptions, 'source'> {
    const { color, size, shape, style } = this.lineLayer?.options ?? {};
    return {
      color: lineColor ?? color,
      size,
      shape,
      style: {
        stroke: lineStroke,
        strokeWidth: style.lineStrokeWidth,
        gapWidth: style.lineStrokeWidth,
        offsets: style.offsets,
      },
    };
  }
}
