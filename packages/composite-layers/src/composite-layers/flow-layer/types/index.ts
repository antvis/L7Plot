import { LineLayerOptions, LineLayerStyleOptions } from '../../../core-layers/line-layer/types';
import { PointLayerOptions, PointLayerStyleOptions } from '../../../core-layers/point-layer/types';
import { TextLayerStyleOptions } from '../../../core-layers/text-layer/types';
import { CompositeLayerOptions } from '../../../core/composite-layer';

export type GetClusterName = (clusterLocation: ClusterLocation, index: number) => Promise<string> | string;

export type ClusterOptions = {
  /**
   * 客流点聚合类型
   */
  clusterType: 'HCA';
  /**
   * zoom 计算步长
   */
  clusterZoomStep: number;
  /**
   * 聚合点像素尺寸
   */
  clusterNodeSize: number;
  /**
   * 聚合半径
   */
  clusterRadius: number;
  /**
   * 聚合力度
   */
  clusterExtent: number;
};

export type DisplayOptions = {
  /**
   * 最大展示的客流线条数
   */
  maxTopFlowNum: number;
};

export type ClusterState = ClusterOptions & {
  /**
   * Scene 设置的最小 zoom
   */
  minZoom: number;
  /**
   * Scene 设置的最大 zoom
   */
  maxZoom: number;
};

export type MapStatus = {
  /**
   * 当前地图所在 Scene
   */
  zoom: number;
  /**
   * 当前地图所展示的区域 bbox
   */
  bounds: [number, number, number, number];
};

export type ClusterLocationKDBush = KDBush<ClusterLocation>;

export type ClusterLevel = {
  /**
   * 所在层级下的聚合点
   */
  locations: ClusterLocation[];
  /**
   * 所在层级下聚合点的查询树
   */
  locationTree: ClusterLocationKDBush;
  /**
   * 所在层级数值
   */
  zoom: number;
};

export type OriginLocation = {
  /**
   * 客流点 id
   */
  id: string;
  /**
   * 经度
   */
  lng: number;
  /**
   * 维度
   */
  lat: number;
  /**
   * 权重
   */
  weight: number;

  /**
   * 结点名称
   */
  name?: string;
};

export type OriginFlow = {
  /**
   * 客流线 id
   */
  id: string;
  /**
   * 起点 id
   */
  fromId: string;
  /**
   * 终点 id
   */
  toId: string;
  /**
   * 权重
   */
  weight: number;
};

export type ClusterLocation = OriginLocation & {
  /**
   * 客流点在 tree 中的 x
   */
  x: number;
  /**
   * 客流点在 tree 中的 y
   */
  y: number;
  /**
   * 客流点最后出现的 zoom
   */
  zoom: number;
  /**
   * 当前节点的父节点
   */
  parentId?: string;
  /**
   * 当前聚合节点的子节点
   */
  childIds?: string[];
};

export type ClusterFlow = OriginFlow & {
  /**
   * 起/终点的经/纬度
   */
  fromLng: number;
  fromLat: number;
  toLng: number;
  toLat: number;
};

export type OriginData = {
  locations: OriginLocation[];
  flows: OriginFlow[];
};

export type FlowDataProviderState = ClusterOptions &
  DisplayOptions & {
    maxZoom: number;
    minZoom: number;
    mapStatus: MapStatus;
  };

export type FlowParser = {
  type: 'json';
  x: string;
  y: string;
  x1: string;
  y1: string;
  weight: string;
  name?: string;
  name1?: string;
};

export type FlowSource = {
  data: Record<string, any>[];

  parser: FlowParser;
};

export type FLowLayerActiveOptions = {
  /**
   * 当客流点呗激活时，是否自动高亮该其关联的客流线
   */
  enableCircleSpread?: boolean;
  /**
   * 当客流线呗激活时，是否自动高亮该其关联的客流点
   */
  enableLineSpread?: boolean;
  /**
   * 客流点颜色
   */
  circleColor?: PointLayerOptions['color'];
  /**
   * 客流点边框颜色
   */
  circleStrokeColor?: PointLayerStyleOptions['stroke'];
  /**
   * 客流线填充颜色
   */
  lineColor?: LineLayerOptions['color'];
  /**
   * 客流线边框颜色
   */
  lineStroke?: LineLayerStyleOptions['stroke'];
};

export interface FlowLayerOptions extends CompositeLayerOptions, Partial<ClusterOptions>, Partial<DisplayOptions> {
  /**
   * 客流数据 Source
   */
  source: FlowSource;

  /**
   * 客流点填充颜色
   * @default '#fff'
   */
  circleColor?: PointLayerOptions['color'];

  /**
   * 客流点大小
   * @default { field: 'weight', value: [1, 16] }
   */
  circleRadius?: PointLayerOptions['size'];

  /**
   * 客流点透明度
   */
  circleOpacity?: PointLayerStyleOptions['opacity'];

  /**
   * 客流点边框颜色
   * @default '#000'
   */
  circleStrokeColor?: PointLayerStyleOptions['stroke'];

  /**
   * 客流点边框宽度
   * @default 1
   */
  circleStrokeWidth?: PointLayerStyleOptions['strokeWidth'];

  /**
   * 客流线填充颜色
   * @default { field: 'weight', value: ['#2a5674', '#d1eeea'] }
   */
  lineColor?: LineLayerOptions['color'];

  /**
   * 客流线宽度
   * @default { field: 'weight', value: [1, 16] }
   */
  lineWidth?: LineLayerOptions['size'];

  /**
   * 客流线透明度
   */
  lineOpacity?: LineLayerStyleOptions['opacity'];

  /**
   * 客流线边框颜色
   */
  lineStroke?: LineLayerStyleOptions['stroke'];

  /**
   * 客流线边框宽度
   */
  lineStrokeWidth?: LineLayerStyleOptions['strokeWidth'];

  /**
   * 客流线边框宽度
   */
  lineStrokeOpacity?: LineLayerStyleOptions['strokeOpacity'];

  /**
   * 是否启用根据权重映射半透明值
   */
  fadeOpacityEnabled?: boolean;
  /**
   * 半透明的权重
   */
  fadeOpacityAmount?: number;

  /**
   * 是否展示点名称
   */
  showLocationName?: boolean;

  /**
   * 获取聚合点名称的方法
   */
  getClusterLocationName?: GetClusterName;

  /**
   * 点名称字体大小
   */
  locationNameSize?: TextLayerStyleOptions['fontSize'];

  /**
   * 点名称字体填充颜色
   */
  locationNameColor?: TextLayerStyleOptions['fill'];

  /**
   * 点名称字体边框颜色
   */
  locationNameStroke?: TextLayerStyleOptions['stroke'];

  /**
   * 点名称字体边框宽度
   */
  locationNameStrokeWidth?: TextLayerStyleOptions['strokeWidth'];

  /**
   * 点名称字体边框透明度
   */
  locationNameStrokeOpacity?: TextLayerStyleOptions['strokeOpacity'];

  /**
   * 点名称字体偏移
   */
  locationNameOffset?: TextLayerStyleOptions['textOffset'];

  /**
   * 交互反馈
   */
  state?: {
    /**
     * 高亮交互
     * @default false
     */
    active?: boolean | FLowLayerActiveOptions;
    /**
     * 选中交互
     * @default false
     */
    select?: boolean | FLowLayerActiveOptions;
  };
}
