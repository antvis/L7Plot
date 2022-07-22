import KdBush from 'kdbush';
import { SizeAttr, ColorAttr } from '../../../types';

// 属性访问器
export type Getter<DataType = any, ValueType = any> =
  | string
  | (string | number)[]
  | ((item: DataType, index: number) => ValueType);

// 屏幕展示范围经纬度
export type BBox = [number, number, number, number];

// 值映射类型
export type ScaleType = 'linear' | 'log' | 'pow' | 'quantile' | 'quantize' | 'sqrt';

// 聚合点/线颜色配置，如果直接传值默认scaleType为线性
export type ClusterColor =
  | [string, string]
  | {
      scaleType: ScaleType;
      value: [string, string];
    };

// 聚合点/线大小配置，如果直接传值默认scaleType为线性
export type ClusterSize =
  | [number, number]
  | {
      scaleType: ScaleType;
      value: [number, number];
    };

// 聚合点线样式层级数据
export type ClusterStyle = {
  color: ClusterColor;
  size: ClusterSize;
};

// 地图相关配置
export type MapStatus = {
  minZoom: number;
  maxZoom: number;
};

// 聚合方法配置
export interface BaseClusterOptions {
  // 缩放比遍历间隔单位，默认为1
  zoomStep: number;
  // 聚合类型，默认使用HCA
  clusterType: string;
  // 自定义聚合方法
  clusterMethod?: (locations: LocationItem[], options: BaseClusterOptions, mapStatus: MapStatus) => LocationLevel[];
}

// HCA算法配置
export interface HCAClusterOptions extends BaseClusterOptions {
  clusterType: 'HCA';
  // 聚合力度
  clusterLevel: number;
}

export interface H3ClusterOptions extends BaseClusterOptions {
  clusterType: 'H3';
  // 聚合力度
  clusterLevel: number;
}

export type ClusterOptions = BaseClusterOptions | HCAClusterOptions | H3ClusterOptions;

export type FieldGetter<DataType = any> = {
  fromLng: Getter<DataType, number>;
  fromLat: Getter<DataType, number>;
  toLng: Getter<DataType, number>;
  toLat: Getter<DataType, number>;
  weight: Getter<DataType, number>;
  fromId?: Getter<DataType, string>;
  toId?: Getter<DataType, string>;
  id?: Getter<DataType, string>;
};

export interface DataServiceOptions<DataType = any> {
  cluster: ClusterOptions;
  location: ClusterStyle;
  flow: ClusterStyle;
  data: any[];
  fieldGetter: FieldGetter<DataType>;
  overflowLimit: number;
}

/**
 * 客流点数据项
 */
export type LocationItem<DataType = any> = {
  id: string; // 客流点唯一id
  lng: number; // 经度
  lat: number; // 维度
  x: number; // 经度映射到二维坐标系中[0, 1]区间的值，用于聚类计算
  y: number; // 维度映射到二维坐标系中[0, 1]区间的值，用于聚类计算
  weight: number; // 权重，等于改点相关客流线的入度和出度的总和
  clusterId?: string; // 被聚合后，聚合结点（或者说父节点）的id
  isCluster?: boolean; // 是否为聚合节点
  childIds: string[]; // 作为聚合点被创建时，被聚合的子节点id数组
  originData: DataType[]; // 原始数据Item
};

/**
 * 客流线路数据项
 */
export type FlowItem<DataType = any> = {
  id: string; // 客流线路唯一id
  fromId: string; // 起点id
  fromLng: number; // 起点经度
  fromLat: number; // 终点维度
  toId: string; // 终点id
  toLng: number; // 终点经度
  toLat: number; // 终点维度
  weight: number; // 权重
  isCluster?: boolean; // 是否为聚合线路
  childIds: string[]; // 作为聚合线路被创建时，被聚合的子线路id数组
  originData: DataType[]; // 原始数据Item
};

export type LocationFlow<DataType = any> = {
  locations: LocationItem<DataType>[];
  flows: FlowItem<DataType>[];
};

export type LocationMap = Map<string, LocationItem>;
export type FlowMap = Map<string, FlowItem>;

export type LocationLevel = {
  locations: LocationItem[];
  locationMap: LocationMap;
  locationTree: KdBush<LocationItem>;
  zoom: number;
};

export type FlowLevel = {
  zoom: number;
  flows: FlowItem[];
  flowMap: FlowMap;
};

export type StyleLevel = {
  size: SizeAttr;
  color: ColorAttr;
  zoom: number;
};

export type LocationFlowLevel = LocationLevel &
  FlowLevel & {
    locationStyle: StyleLevel;
  } & {
    flowStyle: StyleLevel;
  };

export type ZoomData = LocationFlowLevel & {
  displayLocations: LocationItem[];
  displayFlows: FlowItem[];
};
