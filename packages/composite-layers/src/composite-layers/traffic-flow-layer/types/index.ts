import { LineLayerOptions } from '../../../core-layers/line-layer/types';
import { PointLayerOptions } from '../../../core-layers/point-layer/types';
import { CompositeLayerOptions } from '../../../core/composite-layer';

export type ClusterOptions = {
  // 客流点聚合类型
  clusterType: 'HCA';
  // zoom 计算步长
  zoomStep: number;
  // 聚合点像素尺寸
  nodeSize: number;
  // 聚合半径
  radius: number;
  // 聚合力度
  extent: number;
};

export type DisplayOptions = {
  // 最大展示的客流线条数
  maxTopFlowNum: number;
};

export type ClusterState = ClusterOptions & {
  // Scene 设置的最小 zoom
  minZoom: number;
  // Scene 设置的最大 zoom
  maxZoom: number;
};

export type MapStatus = {
  // 当前地图所在 Scene
  zoom: number;
  // 当前地图所展示的区域 bbox
  bounds: [number, number, number, number];
};

export type ClusterLocationKDBush = KDBush<ClusterLocation>;

export type ClusterLevel = {
  // 所在层级下的聚合点
  locations: ClusterLocation[];
  // 所在层级下聚合点的查询树
  locationTree: ClusterLocationKDBush;
  // 所在层级数值
  zoom: number;
};

export type TrafficLocation = {
  // 客流点 id
  id: string;
  // 经度
  lng: number;
  // 维度
  lat: number;
  // 权重
  weight: number;
};

export type TrafficFlow = {
  // 客流线 id
  id: string;
  // 起点 id
  fromId: string;
  // 终点 id
  toId: string;
  // 权重
  weight: number;
};

export type ClusterLocation = TrafficLocation & {
  // 客流点在 tree 中的 x
  x: number;
  // 客流点在 tree 中的 y
  y: number;
  // 客流点最后出现的 zoom
  zoom: number;
  // 当前节点的父节点
  parentId?: string;
  // 当前聚合节点的子节点
  childIds?: string[];
};

export type ClusterFlow = TrafficFlow & {
  // 起/终点的经/纬度
  fromLng: number;
  fromLat: number;
  toLng: number;
  toLat: number;
};

export type OriginTrafficData = {
  locations: TrafficLocation[];
  flows: TrafficFlow[];
};

export type TrafficFlowDataProviderState = ClusterOptions &
  DisplayOptions & {
    maxZoom: number;
    minZoom: number;
    mapStatus: MapStatus;
  };

export type TrafficFlowParser = {
  type: 'json';
  x: string;
  y: string;
  x1: string;
  y1: string;
  weight: string;
};

export type TrafficFlowSource = {
  data: any[];

  parser: TrafficFlowParser;
};

export interface TrafficFlowLayerOptions
  extends CompositeLayerOptions,
    Partial<ClusterOptions>,
    Partial<DisplayOptions> {
  source: TrafficFlowSource;

  locationColor?: PointLayerOptions['color'];

  locationSize?: PointLayerOptions['size'];

  locationStyle?: PointLayerOptions['style'];

  flowColor?: LineLayerOptions['color'];

  flowSize?: LineLayerOptions['size'];

  flowStyle?: LineLayerOptions['style'];
  // 是否启用根据权重映射半透明值
  fadeEnabled?: boolean;
  // 半透明的权重
  fadeAmount?: number;

  opacity?: number;
}
