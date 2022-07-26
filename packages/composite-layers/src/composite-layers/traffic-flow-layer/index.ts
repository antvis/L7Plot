import { CompositeLayer } from '../../core/composite-layer';
import { BBox, ClusterStyle, DataServiceOptions, TrafficFlowLayerOptions } from './types';
import { DEFAULT_OPTIONS, DEFAULT_OVERFLOW_LIMIT, FLOW_LAYER_ID, LOCATION_LAYER_ID } from './constants';
import { ICoreLayer } from '../../types';
import { PointLayer } from '../../core-layers/point-layer';
import { LineLayer } from '../../core-layers/line-layer';
import { DataService } from './data-service';
import { Scene } from '@antv/l7-scene';
import { debounce } from 'lodash-es';
import { LineLayerOptions } from '../../core-layers/line-layer/types';
import { PointLayerOptions } from '../../core-layers/point-layer/types';
import { DataServiceEvent } from './data-service/constants';

export type { TrafficFlowLayerOptions };

export class TrafficFlowLayer<DataType = any> extends CompositeLayer<TrafficFlowLayerOptions<DataType>> {
  /**
   * 默认配置项
   */
  static DefaultOptions: Partial<TrafficFlowLayerOptions> = DEFAULT_OPTIONS;

  /**
   * 符合图层类型
   */
  public type = CompositeLayer.LayerType.TrafficFlowLayer;

  /**
   * 图层是否具有交互属性
   */
  readonly interaction = true;

  /**
   * 数据管理
   * @protected
   */
  protected dataService: DataService;

  /**
   * 当前展示哪一层级下的数据
   */
  protected matchZoom = 0;

  constructor(options: TrafficFlowLayerOptions) {
    super(options);

    this.dataService = new DataService(this.getDataServiceOptions());
  }

  protected get layer() {
    return this.locationLayer;
  }

  public get locationLayer() {
    return this.subLayers.getLayer(LOCATION_LAYER_ID) as PointLayer;
  }

  public get flowLayer() {
    return this.subLayers.getLayer(FLOW_LAYER_ID) as LineLayer;
  }

  /**
   * 获取默认配置
   */
  public getDefaultOptions(): Partial<TrafficFlowLayerOptions> {
    return TrafficFlowLayer.DefaultOptions;
  }

  /**
   * 在图层被scene添加时，需要获取其最大最小缩放比并将其设置进map中。
   * @param scene
   */
  addTo(scene: Scene) {
    super.addTo(scene);
    const minZoom = scene.getMinZoom();
    const maxZoom = scene.getMaxZoom();
    this.dataService.setMapStatus({
      maxZoom,
      minZoom,
    });
    this.onMapChange();
    scene.on('zoomchange', this.onMapChange);
    scene.on('mapmove', this.onMapChange);
  }

  /**
   * 创建图层组
   * @protected
   */
  protected createSubLayers(): ICoreLayer[] {
    const locationLayer = new PointLayer({
      ...this.getLocationLayerOptions(),
      id: LOCATION_LAYER_ID,
    });

    const flowLayer = new LineLayer({
      ...this.getFlowLayerOptions(),
      id: FLOW_LAYER_ID,
      shape: 'halfLine',
      source: { data: [] },
    });

    return [flowLayer, locationLayer];
  }

  /**
   * 获取点图层配置
   * @protected
   */
  protected getLocationLayerOptions(): PointLayerOptions {
    return {
      source: {
        data: [],
      },
      shape: 'circle',
      ...this.options.pointConfig,
    };
  }

  /**
   * 获取线图层配置
   * @protected
   */
  protected getFlowLayerOptions(): Partial<LineLayerOptions> {
    return {
      ...this.options.lineConfig,
    };
  }

  /**
   * 获取数据中心DataProvider构造器参数
   * @protected
   */
  protected getDataServiceOptions(): DataServiceOptions<DataType> {
    const { pointConfig, lineConfig, fieldGetter, cluster, source, overflowLimit } = this.options;
    const locationStyle: ClusterStyle = {
      size: pointConfig?.size,
      color: pointConfig?.color,
    };
    const flowStyle: ClusterStyle = {
      size: lineConfig?.size,
      color: lineConfig?.color,
    };

    return {
      cluster,
      locationLayerStyle: locationStyle,
      flowLayerStyle: flowStyle,
      fieldGetter,
      overflowLimit: overflowLimit ?? DEFAULT_OVERFLOW_LIMIT,
      data: source.data,
    };
  }

  /**
   * 当地图缩放层级或位置发生变化时，需要重新更新图层数据和配置
   * @protected
   */
  protected onMapChange = debounce(
    () => {
      if (!this.scene) {
        return;
      }
      this.matchZoom = this.dataService.getMatchZoom(this.scene.getZoom());
      if (this.matchZoom < 0) {
        this.dataService.once(DataServiceEvent.Init, this.onMapChange);
        return;
      }
      const { displayFlows, displayLocations, locationStyle, flowStyle } = this.dataService.getZoomData(
        this.scene.getBounds().flat() as BBox,
        this.matchZoom
      );
      this.updateSubLayers({
        pointConfig: {
          ...locationStyle,
          source: {
            data: displayLocations,
            parser: {
              type: 'json',
              x: 'lng',
              y: 'lat',
            },
          },
        },
        lineConfig: {
          ...flowStyle,
          source: {
            data: displayFlows,
            parser: {
              type: 'json',
              x: 'fromLng',
              y: 'fromLat',
              x1: 'toLng',
              y1: 'toLat',
            },
          },
        },
      });
    },
    50,
    {}
  );

  /**
   * 根据传入配置更新对应layer
   * @param options
   * @protected
   */
  protected updateSubLayers(options: Partial<TrafficFlowLayerOptions<DataType>>) {
    const { pointConfig, lineConfig } = options;
    if (pointConfig) {
      this.locationLayer.update(pointConfig);
      if (pointConfig.source) {
        this.locationLayer.changeData(pointConfig.source);
      }
    }
    if (lineConfig) {
      this.flowLayer.update(lineConfig);
      if (lineConfig.source) {
        this.flowLayer.changeData(lineConfig.source);
      }
    }
  }

  public getLocationData(id: string) {
    return this.dataService.getTargetOriginData(id, this.matchZoom, 'location');
  }

  public getFlowData(id: string) {
    return this.dataService.getTargetOriginData(id, this.matchZoom, 'flow');
  }
}
