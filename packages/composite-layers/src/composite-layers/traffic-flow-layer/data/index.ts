import EventEmitter from '@antv/event-emitter';
import { createSelector } from 'reselect';
import { TrafficFlowDataProviderState, TrafficFlowSource } from '../types';
import { buildIndex } from './build-index';
import { clusterFlows, clusterLocations } from './cluster';
import { transformSource } from './transform';

export class DataProvider extends EventEmitter {
  public getSourceData = (source: TrafficFlowSource, config: TrafficFlowDataProviderState) => source.data;
  public getSourceParser = (source: TrafficFlowSource, config: TrafficFlowDataProviderState) => source.parser;
  public getMapZoom = (source: TrafficFlowSource, config: TrafficFlowDataProviderState) => config.mapStatus.zoom;
  public getMapBounds = (source: TrafficFlowSource, config: TrafficFlowDataProviderState) => config.mapStatus.bounds;
  public getClusterType = (source: TrafficFlowSource, config: TrafficFlowDataProviderState) => config.clusterType;
  public getExtent = (source: TrafficFlowSource, config: TrafficFlowDataProviderState) => config.extent;
  public getNodeSize = (source: TrafficFlowSource, config: TrafficFlowDataProviderState) => config.nodeSize;
  public getRadius = (source: TrafficFlowSource, config: TrafficFlowDataProviderState) => config.radius;
  public getMinZoom = (source: TrafficFlowSource, config: TrafficFlowDataProviderState) => config.minZoom;
  public getMaxZoom = (source: TrafficFlowSource, config: TrafficFlowDataProviderState) => config.maxZoom;
  public getZoomStep = (source: TrafficFlowSource, config: TrafficFlowDataProviderState) => config.zoomStep;
  public getMaxTopFlowNum = (source: TrafficFlowSource, config: TrafficFlowDataProviderState) => config.maxTopFlowNum;

  /**
   * 将 source 转换成最底层的客流点/线数据
   */
  public getTrafficOriginData = createSelector(this.getSourceData, this.getSourceParser, (data, parser) => {
    return transformSource({ data, parser });
  });

  /**
   * 获取聚合配置
   */
  public getClusterOptions = createSelector(
    this.getClusterType,
    this.getExtent,
    this.getNodeSize,
    this.getRadius,
    this.getMinZoom,
    this.getMaxZoom,
    this.getZoomStep,
    (clusterType, extent, nodeSize, radius, minZoom, maxZoom, zoomStep) => {
      return { clusterType, extent, nodeSize, radius, minZoom, maxZoom, zoomStep };
    }
  );

  /**
   * 获取各个层级下的聚合点数组
   */
  public getClusterLevels = createSelector(
    this.getTrafficOriginData,
    this.getClusterOptions,
    ({ locations }, clusterOptions) => {
      return clusterLocations(locations, clusterOptions);
    }
  );

  /**
   * 获取聚合点的检索器
   */
  public getClusterIndex = createSelector(this.getClusterLevels, (clusterLevels) => {
    return buildIndex(clusterLevels);
  });

  /**
   * 获取当前需要展示的聚合点
   */
  public getFilterLocations = createSelector(
    this.getClusterIndex,
    this.getMapZoom,
    this.getMapBounds,
    (clusterIndex, zoom, bounds) => {
      return clusterIndex.getMapLocations(zoom, bounds);
    }
  );

  public getLocationWeightRange = createSelector(this.getClusterIndex, this.getMapZoom, function (clusterIndex, zoom): [
    number,
    number
  ] {
    const { locations } = clusterIndex.getAppropriateLevel(zoom);
    if (!locations.length) {
      return [0, 0];
    }
    const { weight: minWeight } = locations[0];
    const { weight: maxWeight } = locations[locations.length - 1];
    return [minWeight, maxWeight];
  });

  /**
   * 获取当前层级下的聚合线数据
   */
  public getAggregatedFlows = createSelector(
    this.getClusterIndex,
    this.getTrafficOriginData,
    this.getMapZoom,
    (clusterIndex, { flows: originFlows }, zoom) => {
      return clusterFlows(originFlows, clusterIndex, zoom);
    }
  );

  /**
   * 获取当前需要展示的聚合线数据
   */
  public getFilterFlows = createSelector(
    this.getFilterLocations,
    this.getAggregatedFlows,
    this.getMaxTopFlowNum,
    (filterLocations, fullFlows, maxTopFlowNum) => {
      if (fullFlows.length <= maxTopFlowNum) {
        return fullFlows;
      }
      let flows = [...fullFlows];
      const filterLocationIdSet = new Set(filterLocations.map((location) => location.id));
      flows = flows.filter((flow) => {
        return filterLocationIdSet.has(flow.fromId) || filterLocationIdSet.has(flow.toId);
      });
      if (flows.length > maxTopFlowNum) {
        flows = flows.slice(flows.length - maxTopFlowNum, flows.length);
      }
      return flows;
    }
  );

  /**
   * 获取当前层级下筛选前的权重区间，用于计算客流线的宽度和颜色深浅
   */
  public getFlowWeightRange = createSelector(this.getAggregatedFlows, function (flows): [number, number] {
    if (!flows.length) {
      return [0, 0];
    }
    const { weight: minWeight } = flows[0];
    const { weight: maxWeight } = flows[flows.length - 1];
    return [minWeight, maxWeight];
  });

  /**
   * 获取当前层级下筛选后的客流线的权重区间，主要用于客流线透明度的计算
   */
  public getFilterFlowWeightRange = createSelector(this.getFilterFlows, function (flows): [number, number] {
    if (!flows.length) {
      return [0, 0];
    }
    const { weight: minWeight } = flows[0];
    const { weight: maxWeight } = flows[flows.length - 1];
    return [minWeight, maxWeight];
  });
}
