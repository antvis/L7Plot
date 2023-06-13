import { ClusterLevel, ClusterLocation } from '../types';
import { findAppropriateZoom } from '../utils';
import { latY, lngX } from './transform';

/**
 * 建立聚合点的检索索引对象
 * @param clusterLevels
 * @returns
 */
export function buildIndex(clusterLevels: ClusterLevel[]) {
  const zoomList = clusterLevels.map((i) => i.zoom).reverse();
  const clusterIdMap = new Map<string, ClusterLocation>();
  const clusterZoomMap = new Map<string, ClusterLocation>();

  clusterLevels.forEach(({ locations }) => {
    locations.forEach((location) => {
      clusterIdMap.set(location.id, location);
    });
  });

  /**
   * 计算距离 targetZoom 最近的有效 zoom
   * @param targetZoom
   * @returns
   */
  function getAppropriateLevel(targetZoom: number) {
    const matchZoom = findAppropriateZoom(zoomList, targetZoom);
    return clusterLevels.find((clusterLevel) => clusterLevel.zoom === matchZoom)!;
  }

  /**
   * 获取当前地图范围内的点
   * @param targetZoom
   * @param bounds
   */
  function getMapLocations(targetZoom: number, bounds: [number, number, number, number]): ClusterLocation[] {
    const [lng1, lat1, lng2, lat2] = bounds;
    const targetLevel = getAppropriateLevel(targetZoom);
    const { locations, locationTree } = targetLevel;
    const minX = Math.min(lngX(lng1), lngX(lng2));
    const maxX = Math.max(lngX(lng1), lngX(lng2));
    const minY = Math.min(latY(lat1), latY(lat2));
    const maxY = Math.max(latY(lat1), latY(lat2));
    const indexes = locationTree.range(minX, minY, maxX, maxY);
    return indexes.map((index) => locations[index]!);
  }

  /**
   * 获取目标聚合点所包含的所有原始客流点 id
   * @param clusterId
   * @returns
   */
  function getLocationIdsFromCluster(clusterId: string): string[] {
    const set = new Set<string>();
    const clusterIds = [clusterId];
    while (clusterIds.length) {
      const id = clusterIds.pop();
      if (id) {
        const cluster = clusterIdMap.get(id);
        if (cluster) {
          if (cluster.childIds?.length) {
            clusterIds.push(...cluster.childIds);
          } else {
            set.add(cluster.id);
          }
        }
      }
    }

    return Array.from(set.values());
  }

  /**
   * 为原始聚合点找到其目标层级下的聚合点
   * @param locationId
   * @param zoom
   * @returns
   */
  function findClusterForZoom(locationId: string, zoom: number) {
    const key = `${locationId}-${zoom}`;
    let targetCluster = clusterZoomMap.get(`${locationId}-${zoom}`);
    if (targetCluster) {
      return targetCluster;
    }
    let cluster = clusterIdMap.get(locationId);
    let parentCluster = (cluster?.parentId && clusterIdMap.get(cluster.parentId)) || undefined;
    while (cluster && parentCluster) {
      if (cluster.zoom >= zoom && zoom >= parentCluster.zoom) {
        break;
      }
      cluster = parentCluster;
      parentCluster = (cluster?.parentId && clusterIdMap.get(cluster.parentId)) || undefined;
    }
    targetCluster = cluster && cluster.zoom <= zoom ? cluster : parentCluster;
    if (targetCluster) {
      clusterZoomMap.set(key, targetCluster);
    }
    return targetCluster;
  }

  return {
    zoomList,
    getAppropriateLevel,
    getMapLocations,
    getLocationIdsFromCluster,
    findClusterForZoom,
  };
}
