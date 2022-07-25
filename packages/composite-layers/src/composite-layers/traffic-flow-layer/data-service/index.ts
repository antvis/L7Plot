import {
  BBox,
  DataServiceOptions,
  FlowItem,
  LocationFlow,
  LocationFlowLevel,
  LocationItem,
  MapStatus,
  ZoomData,
} from './types';
import { initOriginData } from './init';
import { getLocationLevels, getFlowLevels, getStyleLevels } from './cluster';
import { lat2Y, lng2X } from './utils';

export class DataService {
  private originData: LocationFlow = {
    locations: [],
    flows: [],
  };

  private mapStatus?: MapStatus;

  private options: DataServiceOptions;

  private locationFlowLevels: LocationFlowLevel[] = [];

  constructor(options: DataServiceOptions) {
    const { locations, flows } = initOriginData(options.data, options.fieldGetter);
    this.originData = {
      locations,
      flows,
    };
    this.options = options;
  }

  setMapStatus(newMapStatus: MapStatus) {
    this.mapStatus = newMapStatus;
    if (newMapStatus) {
      this.updateLevels();
    }
  }

  updateLevels() {
    if (!this.mapStatus) {
      return;
    }
    const { locations, flows } = this.originData;
    const { cluster, locationLayerStyle, flowLayerStyle } = this.options;

    // console.time('locationLevels');
    const locationLevels = getLocationLevels(locations, cluster, this.mapStatus);
    // console.timeEnd('locationLevels');

    // console.time('flowLevels');
    const flowLevels = getFlowLevels(flows, locationLevels, cluster);
    // console.timeEnd('flowLevels');

    const locationStyleLevels = getStyleLevels(locationLevels, locationLayerStyle);
    // console.log('--------');
    const flowStyleLevels = getStyleLevels(flowLevels, flowLayerStyle);

    const locationFlowLevels: LocationFlowLevel[] = [];

    for (const index in locationLevels) {
      locationFlowLevels.push({
        ...(locationLevels[index] ?? {}),
        ...(flowLevels[index] ?? {}),
        locationStyle: locationStyleLevels[index] ?? {},
        flowStyle: flowStyleLevels[index] ?? {},
      });
    }
    this.locationFlowLevels = locationFlowLevels;
  }

  /**
   * 遍历locationFlowLevels层级数据，查询地图当前缩放比currentZoom对应匹配的zoom值
   * @param currentZoom
   */
  getMatchZoom(currentZoom: number) {
    const locationFlowLevels = this.locationFlowLevels;
    if (currentZoom > locationFlowLevels[0].zoom) {
      return locationFlowLevels[0].zoom;
    }
    for (let i = 1; i < locationFlowLevels.length; i++) {
      const zoom1 = locationFlowLevels[i - 1].zoom;
      const zoom2 = locationFlowLevels[i].zoom;
      if (currentZoom <= zoom1 && zoom2 <= currentZoom) {
        return zoom2;
      }
    }
    return locationFlowLevels[locationFlowLevels.length - 1].zoom;
  }

  getZoomData([lng1, lat1, lng2, lat2]: BBox, zoom: number): ZoomData {
    let displayLocations: LocationItem[] = [];
    let displayFlows: FlowItem[] = [];
    const targetLevel = this.locationFlowLevels.find((item) => item.zoom === zoom)!;
    const { locations, locationTree, flows } = targetLevel;
    const locationIndexes = targetLevel.locationTree.range(lng2X(lng1), lat2Y(lat2), lng2X(lng2), lat2Y(lat1));
    if (locationIndexes.length === locations.length || locations.length + flows.length < this.options.overflowLimit) {
      displayLocations = locations;
      displayFlows = flows;
    } else if (locationIndexes.length > 0) {
      displayLocations = locationIndexes.map((index) => locationTree.points[index]);
      const nodeIdSet = new Set(displayLocations.map((location) => location.id));
      displayFlows = flows.filter(({ fromId, toId }) => {
        return nodeIdSet.has(fromId) || nodeIdSet.has(toId);
      });
    }
    return {
      ...targetLevel,
      displayFlows,
      displayLocations,
    };
  }

  getTargetOriginData(id: string, zoom: number, type: 'location' | 'flow'): LocationItem | FlowItem | null {
    const targetLevelIndex = this.locationFlowLevels.findIndex((item) => item.zoom === zoom);
    if (targetLevelIndex < 0) {
      return null;
    }
    const { locationMap, flowMap } = this.locationFlowLevels[targetLevelIndex]!;
    const map = type === 'location' ? locationMap : flowMap;
    // const map =
    const targetItem = map.get(id);
    if (!targetItem) {
      return null;
    }
    const originData: any[] = targetItem.isCluster ? [] : [...targetItem.originData];
    if (targetItem.isCluster) {
      const clusterIds: string[] = [...(targetItem.childIds ?? [])];
      let levelIndex = targetLevelIndex;
      while (clusterIds.length && levelIndex >= 0) {
        const { locationMap, flowMap } = this.locationFlowLevels[levelIndex]!;
        const map = type === 'location' ? locationMap : flowMap;
        for (let index = 0; index < clusterIds.length; index++) {
          const id = clusterIds[index];
          const target = map.get(id);
          if (target) {
            clusterIds.splice(index, 1);
            index--;
            if (target.isCluster) {
              clusterIds.push(...(target.childIds ?? []));
            } else {
              originData.push(...target.originData);
            }
          }
        }
        levelIndex--;
      }
    }

    return {
      ...targetItem,
      originData: Array.from(new Set(originData)),
    };
  }
}
