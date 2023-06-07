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
import { MapStatus, TrafficFlowDataProviderState, TrafficFlowLayerOptions } from './types';
import { getColorAttribute, getOpacityColorAttribute, getSizeAttribute } from './utils';

export class TrafficFlowLayer extends CompositeLayer<TrafficFlowLayerOptions> {
  constructor(options: TrafficFlowLayerOptions) {
    super({
      ...TrafficFlowLayer.DefaultOptions,
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
  public type = CompositeLayer.LayerType.TrafficFlowLayer;

  /**
   * 数据计算中心
   */
  protected dataProvider = new DataProvider();

  /**
   * 数据计算中心状态管理
   */
  protected dataProviderState!: TrafficFlowDataProviderState;

  protected get layer() {
    return this.flowLayer;
  }

  protected get locationLayer() {
    return this.subLayers.getLayer('locationLayer')!;
  }

  protected get flowLayer() {
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

  public update(options: Partial<TrafficFlowLayerOptions>) {
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
    const locationSize = getSizeAttribute(this.options.locationSize!, locationWeightRange);
    const locationColor = getColorAttribute(this.options.locationColor!, locationWeightRange);
    const flowData = this.dataProvider.getFilterFlows(this.options.source, this.dataProviderState);
    const flowWeightRange = this.dataProvider.getFlowWeightRange(this.options.source, this.dataProviderState);
    const filterFlowWeightRange = this.dataProvider.getFilterFlowWeightRange(
      this.options.source,
      this.dataProviderState
    );
    const flowSize = getSizeAttribute(this.options.flowSize!, flowWeightRange);
    let flowColor = getColorAttribute(this.options.flowColor!, flowWeightRange);
    if (this.options.fadeEnabled) {
      flowColor = getOpacityColorAttribute(flowColor, filterFlowWeightRange, this.options.fadeAmount!);
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

    console.log(this.flowLayer.options);
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
      ...(this.options as Required<TrafficFlowLayerOptions>),
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
    const { minZoom, maxZoom, zIndex, opacity, locationStyle } = this.options;
    return {
      source: {
        data: [],
      },
      shape: 'circle',
      minZoom,
      maxZoom,
      zIndex,
      style: {
        stroke: '#000',
        strokeWidth: 1,
        ...(locationStyle ?? {}),
        opacity,
      },
    };
  }

  protected getFlowLayerOptions(): LineLayerOptions {
    const { minZoom, maxZoom, zIndex, opacity, flowStyle } = this.options;
    return {
      source: {
        data: [],
      },
      shape: 'halfLine',
      minZoom,
      maxZoom,
      zIndex,
      style: {
        borderColor: '#000',
        borderWidth: 1,
        ...(flowStyle ?? {}),
        opacity,
      },
    };
  }
}
