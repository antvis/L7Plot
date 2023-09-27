import EventEmitter from '@antv/event-emitter';
import { createSelector } from 'reselect';
import { ClusterState, FlowDataProviderState, FlowSource } from '../types';
import { buildIndex } from './build-index';
import { clusterFlows, clusterLocations } from './cluster';
import { transformSource } from './transform';

export class DataProvider extends EventEmitter {
  public getSourceData = (source: FlowSource, config: FlowDataProviderState) => source.data;
  public getSourceParser = (source: FlowSource, config: FlowDataProviderState) => source.parser;
  public getMapZoom = (source: FlowSource, config: FlowDataProviderState) => config.mapStatus.zoom;
  public getMapBounds = (source: FlowSource, config: FlowDataProviderState) => config.mapStatus.bounds;
  public getEnableCluster = (source: FlowSource, config: FlowDataProviderState) => config.enableCluster;
  public getClusterType = (source: FlowSource, config: FlowDataProviderState) => config.clusterType;
  public getExtent = (source: FlowSource, config: FlowDataProviderState) => config.clusterExtent;
  public getNodeSize = (source: FlowSource, config: FlowDataProviderState) => config.clusterNodeSize;
  public getRadius = (source: FlowSource, config: FlowDataProviderState) => config.clusterRadius;
  public getMinZoom = (source: FlowSource, config: FlowDataProviderState) => config.minZoom;
  public getMaxZoom = (source: FlowSource, config: FlowDataProviderState) => config.maxZoom;
  public getZoomStep = (source: FlowSource, config: FlowDataProviderState) => config.clusterZoomStep;
  public getMaxTopFlowNum = (source: FlowSource, config: FlowDataProviderState) => config.maxTopFlowNum;

  /**
   * 将 source 转换成最底层的客流点/线数据
   */
  public getOriginData = createSelector(this.getSourceData, this.getSourceParser, (data, parser) => {
    return transformSource({ data, parser });
  });

  /**
   * 获取聚合配置
   */
  public getClusterOptions = createSelector(
    this.getClusterType,
    this.getEnableCluster,
    this.getExtent,
    this.getNodeSize,
    this.getRadius,
    this.getMinZoom,
    this.getMaxZoom,
    this.getZoomStep,
    function (
      clusterType,
      enableCluster,
      clusterExtent,
      clusterNodeSize,
      clusterRadius,
      minZoom,
      maxZoom,
      clusterZoomStep
    ): ClusterState {
      return {
        clusterType,
        enableCluster,
        clusterExtent,
        clusterNodeSize,
        clusterRadius,
        minZoom,
        maxZoom,
        clusterZoomStep,
      };
    }
  );

  /**
   * 获取各个层级下的聚合点数组
   */
  public getClusterLevels = createSelector(
    this.getOriginData,
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
  public getViewLocations = createSelector(
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
    this.getOriginData,
    this.getMapZoom,
    (clusterIndex, { flows: originFlows }, zoom) => {
      return clusterFlows(originFlows, clusterIndex, zoom);
    }
  );

  /**
   * 获取当前需要展示的聚合线数据
   */
  public getFilterFlows = createSelector(
    this.getViewLocations,
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

  public getFilterLocations = createSelector(this.getViewLocations, this.getFilterFlows, (locations, flows) => {
    const locationIdSet = new Set(flows.map((flow) => [flow.fromId, flow.toId]).flat());
    return locations.filter((location) => locationIdSet.has(location.id));
  });

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
