import { debounce } from 'lodash-es';
import { LineLayer } from '../../core-layers/line-layer';
import { LineLayerOptions } from '../../core-layers/line-layer/types';
import { PointLayer } from '../../core-layers/point-layer';
import { PointLayerOptions } from '../../core-layers/point-layer/types';
import { CompositeLayer } from '../../core/composite-layer';
import { OriginMouseLayerEventList } from '../../core/constants';
import { ICoreLayer, Scene } from '../../types';
import { DEFAULT_OPTIONS } from './constants';
import { DataProvider } from './data';
import { FlowDataProviderState, FlowLayerOptions, MapStatus } from './types';
import { getColorAttribute, getOpacityColorAttribute, getSizeAttribute } from './utils';

export class FlowLayer extends CompositeLayer<FlowLayerOptions> {
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

  protected get layer() {
    return this.lineLayer;
  }

  public get circleLayer() {
    return this.subLayers.getLayer('circleLayer')!;
  }

  public get lineLayer() {
    return this.subLayers.getLayer('lineLayer')!;
  }

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<FlowLayerOptions> {
    return FlowLayer.DefaultOptions;
  }

  protected createSubLayers(): ICoreLayer[] {
    const circleLayer = new PointLayer({
      ...this.getCircleLayerOptions(),
      id: 'circleLayer',
      name: 'circleLayer',
    });

    const lineLayer = new LineLayer({
      ...this.getLineLayerOptions(),
      id: 'lineLayer',
      name: 'lineLayer',
    });

    OriginMouseLayerEventList.forEach((eventName) => {
      circleLayer.on(eventName, (e) => this.emit(`circleLayer:${eventName}`, e));
      lineLayer.on(eventName, (e) => this.emit(`lineLayer:${eventName}`, e));
    });

    return [lineLayer, circleLayer];
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
    this.circleLayer.update(this.getCircleLayerOptions());
    this.lineLayer.update(this.getLineLayerOptions());
  }

  protected onMapChange = debounce(
    () => {
      this.updateSubLayers();
    },
    100,
    {
      maxWait: 500,
    }
  );

  protected updateClusterState() {
    const scene = this.scene;
    if (!scene) {
      return;
    }
    const maxZoom = scene.getMaxZoom();
    const minZoom = scene.getMinZoom();

    this.dataProviderState = {
      ...(this.options as Required<FlowLayerOptions>),
      mapStatus: {
        zoom: scene.getZoom(),
        bounds: scene.getBounds().flat() as MapStatus['bounds'],
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
    const { minZoom, maxZoom, zIndex, visible, blend, pickingBuffer, lineOpacity: opacity } = this.options;
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
      shape: 'halfLine',
      minZoom,
      maxZoom,
      zIndex,
      visible,
      blend,
      pickingBuffer,
      style: {
        borderColor: '#000',
        borderWidth: 1,
        opacity,
      },
    };
    if (this.dataProvider && this.scene) {
      const flowWeightRange = this.dataProvider.getFlowWeightRange(this.options.source, this.dataProviderState);
      const filterFlowWeightRange = this.dataProvider.getFilterFlowWeightRange(
        this.options.source,
        this.dataProviderState
      );
      if (this.options.fadeOpacityEnabled && options.style) {
        options.style.opacity = getOpacityColorAttribute(filterFlowWeightRange, this.options.fadeOpacityAmount!);
      }
      options.source.data = this.dataProvider.getFilterFlows(this.options.source, this.dataProviderState);
      options.size = getSizeAttribute(this.options.lineWidth!, flowWeightRange);
      options.color = getColorAttribute(this.options.lineColor!, flowWeightRange);
    }
    return options;
  }
}
