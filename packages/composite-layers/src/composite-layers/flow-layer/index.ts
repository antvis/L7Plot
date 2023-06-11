import { merge } from 'lodash';
import { debounce } from 'lodash-es';
import { LineLayer } from '../../core-layers/line-layer';
import { LineLayerOptions } from '../../core-layers/line-layer/types';
import { PointLayer } from '../../core-layers/point-layer';
import { PointLayerOptions } from '../../core-layers/point-layer/types';
import { CompositeLayer } from '../../core/composite-layer';
import { ICoreLayer, Scene } from '../../types';
import { DEFAULT_OPTIONS } from './constants';
import { DataProvider } from './data';
import { FlowDataProviderState, FlowLayerOptions, MapStatus } from './types';
import { getColorAttribute, getOpacityColorAttribute, getSizeAttribute } from './utils';

export class FlowLayer extends CompositeLayer<FlowLayerOptions> {
  constructor(options: FlowLayerOptions) {
    super({
      ...FlowLayer.DefaultOptions,
      ...options,
    });
    this.dataProvider = new DataProvider();
    this.updateClusterState();
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

  protected get layer() {
    return this.flowLayer;
  }

  public get locationLayer() {
    return this.subLayers.getLayer('locationLayer')!;
  }

  public get flowLayer() {
    return this.subLayers.getLayer('flowLayer')!;
  }

  protected createSubLayers(): ICoreLayer[] {
    const locationLayer = new PointLayer({
      ...this.getLocationLayerOptions(),
      id: 'locationLayer',
      name: 'locationLayer',
    });

    const flowLayer = new LineLayer({
      ...this.getFlowLayerOptions(),
      id: 'flowLayer',
      name: 'flowLayer',
    });

    return [flowLayer, locationLayer];
  }

  public addTo(scene: Scene) {
    super.addTo(scene);
    this.scene?.on('zoomchange', this.onMapChange);
    this.scene?.on('mapmove', this.onMapChange);
    this.updateClusterState();
    this.updateSubLayers();
  }

  public remove() {
    super.remove();
    this.scene?.off('zoomchange', this.onMapChange);
    this.scene?.off('mapmove', this.onMapChange);
  }

  public update(options: Partial<FlowLayerOptions>) {
    super.update(options);
    this.updateClusterState();
  }

  protected updateSubLayers() {
    const scene = this.scene;
    if (!scene) {
      return;
    }
    const locationData = this.dataProvider.getFilterLocations(this.options.source, this.dataProviderState);
    const locationWeightRange = this.dataProvider.getLocationWeightRange(this.options.source, this.dataProviderState);
    const locationSize = getSizeAttribute(this.options.radius!, locationWeightRange);
    const locationColor = getColorAttribute(this.options.color!, locationWeightRange);
    const flowData = this.dataProvider.getFilterFlows(this.options.source, this.dataProviderState);
    const flowWeightRange = this.dataProvider.getFlowWeightRange(this.options.source, this.dataProviderState);
    const filterFlowWeightRange = this.dataProvider.getFilterFlowWeightRange(
      this.options.source,
      this.dataProviderState
    );
    const flowSize = getSizeAttribute(this.options.lineSize!, flowWeightRange);
    let flowColor = getColorAttribute(this.options.lineColor!, flowWeightRange);
    if (this.options.fadeOpacityEnabled) {
      flowColor = getOpacityColorAttribute(flowColor, filterFlowWeightRange, this.options.fadeOpacityAmount!);
    }
    this.locationLayer.update(
      merge({}, this.getLocationLayerOptions(), {
        source: {
          data: locationData,
          parser: {
            type: 'json',
            x: 'lng',
            y: 'lat',
          },
        },
        size: locationSize,
        color: locationColor,
      })
    );

    this.flowLayer.update(
      merge({}, this.getFlowLayerOptions(), {
        source: {
          data: flowData,
          parser: {
            type: 'json',
            x: 'fromLng',
            y: 'fromLat',
            x1: 'toLng',
            y1: 'toLat',
          },
        },
        size: flowSize,
        color: flowColor,
      })
    );
  }

  protected onMapChange = debounce(
    () => {
      this.updateMapStatus();
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
      mapStatus: this.updateMapStatus(),
      maxZoom,
      minZoom,
    };
  }

  protected updateMapStatus() {
    const scene = this.scene;
    if (!scene) {
      return this.dataProviderState.mapStatus;
    }
    const mapStatus: MapStatus = {
      zoom: scene.getZoom(),
      bounds: scene.getBounds().flat() as MapStatus['bounds'],
    };
    this.dataProviderState = {
      ...this.dataProviderState,
      mapStatus,
    };
    return mapStatus;
  }

  protected getLocationLayerOptions(): PointLayerOptions {
    const { minZoom, maxZoom, zIndex, visible, blend, pickingBuffer, style = {} } = this.options;
    return {
      source: {
        data: [],
      },
      shape: 'circle',
      minZoom,
      maxZoom,
      zIndex,
      visible,
      blend,
      pickingBuffer,
      style: {
        stroke: '#000',
        strokeWidth: 1,
        ...style,
      },
    };
  }

  protected getFlowLayerOptions(): LineLayerOptions {
    const { minZoom, maxZoom, zIndex, visible, blend, pickingBuffer, lineStyle = {} } = this.options;
    return {
      source: {
        data: [],
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
        ...lineStyle,
      },
    };
  }
}
