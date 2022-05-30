import { ClusterOptions, HCAClusterOptions, LocationItem, LocationLevel, LocationMap, MapStatus } from '../types';
import KdBush from 'kdbush';
import { createLocationItem } from '../init';
import { createUuid } from '../utils';

/**
 * 生成kdbush搜索树
 * @param locations
 */
export function getSearchTree(locations: LocationItem[]): KDBush<LocationItem> {
  return new KdBush<LocationItem>(
    locations,
    (p) => p.x,
    (p) => p.y,
    64,
    Float64Array
  );
}

/**
 * 生成点聚合数据入口，改函数内根据options中决策选用哪一种聚合类型
 * @param locations
 * @param clusterOptions
 * @param mapStatus
 */
export function getLocationLevels(
  locations: LocationItem[],
  clusterOptions: ClusterOptions,
  mapStatus: MapStatus
): LocationLevel[] {
  if (!locations.length) {
    return [];
  }
  const { clusterMethod, clusterType } = clusterOptions;
  // 使用用户自定义的聚合方法
  if (clusterMethod) {
    return clusterMethod(locations, clusterOptions, mapStatus);
  }
  // 使用HCA算法
  if (clusterType === 'HCA') {
    return getLocationLevelsByHCA(locations, clusterOptions as HCAClusterOptions, mapStatus);
  }
  // 其他内置算法可在此扩展
  console.error('无匹配聚合算法');
  return [];
}

/**
 * HCA点聚合算法
 * @param locations
 * @param clusterOptions
 * @param mapStatus
 */
function getLocationLevelsByHCA(
  locations: LocationItem[],
  clusterOptions: HCAClusterOptions,
  mapStatus: MapStatus
): LocationLevel[] {
  // 原始数据为空时直接返回空数据
  if (!locations.length) {
    return [];
  }
  // 获取遍历zoom的粒度
  const { zoomStep } = clusterOptions;
  // 当前地图支持的最小和最大的缩放比
  const { minZoom, maxZoom } = mapStatus;

  let oldLocations = [...locations];
  let oldTree = getSearchTree(oldLocations);
  // 将最大缩放比以及原始数据作为locationLevels的第一项
  const locationLevels: LocationLevel[] = [
    {
      zoom: maxZoom,
      locations: oldLocations,
      locationMap: new Map(oldLocations.map((location) => [location.id, location])),
      locationTree: oldTree,
    },
  ];

  // 从大到小依次遍历所有缩放比
  for (let zoom = maxZoom - zoomStep; zoom >= minZoom; zoom -= zoomStep) {
    const { locations: newLocations, locationMap: newLocationMap } = getLocationsByHCA(
      oldLocations,
      oldTree,
      zoom,
      clusterOptions
    );
    if (newLocations.length < oldLocations.length) {
      // 仅有新的locations长度比上一层级的locations长度更小时才保存数据
      const newTree = getSearchTree(newLocations);
      locationLevels.push({
        zoom,
        locations: newLocations,
        locationMap: newLocationMap,
        locationTree: newTree,
      });
      oldLocations = newLocations;
      oldTree = newTree;
    }
  }

  if (locationLevels.length > 1) {
    locationLevels[0].zoom = locationLevels[1].zoom + zoomStep;
  }
  return locationLevels;
}

/**
 * 遍历上一层级的点数据，用HCA算法聚合当前层级zoom下的点数组
 * @param oldLocations
 * @param tree
 * @param zoom
 * @param clusterOptions
 */
function getLocationsByHCA(
  oldLocations: LocationItem[],
  tree: KdBush<LocationItem>,
  zoom: number,
  clusterOptions: HCAClusterOptions
): {
  locations: LocationItem[];
  locationMap: LocationMap;
} {
  const { clusterLevel = 6 } = clusterOptions;
  const newLocations: LocationItem[] = [];
  const newLocationMap: LocationMap = new Map();
  const radius = (clusterLevel * 10) / (256 * Math.pow(2, zoom));
  const doneIdSet = new Set();

  for (const location of oldLocations) {
    if (doneIdSet.has(location.id)) {
      continue;
    }
    const innerIndexes = tree.within(location.x, location.y, radius);
    doneIdSet.add(location.id);

    if (innerIndexes.length > 1) {
      let weight = location.weight;
      let weightX = location.x * weight;
      let weightY = location.y * weight;
      const childIds: string[] = [location.id];
      // const originData: any[] = [...location.originData];
      const clusterId = createUuid();
      for (const innerIndex of innerIndexes) {
        const innerLocation = tree.points[innerIndex];
        if (doneIdSet.has(innerLocation.id)) {
          continue;
        }
        doneIdSet.add(innerLocation.id);
        weight += innerLocation.weight;
        weightX += innerLocation.weight * innerLocation.x;
        weightY += innerLocation.weight * innerLocation.y;
        innerLocation.clusterId = clusterId;
        childIds.push(innerLocation.id);
        // originData.push(...innerLocation.originData);
      }
      // 仅当cluster子节点数量大于1时才升级了新Cluster
      // 防止圆内的其他结点都是已经被聚合过的
      if (childIds.length > 1) {
        location.clusterId = clusterId;
        const newLocation = createLocationItem({
          x: weightX / weight,
          y: weightY / weight,
          childIds,
          id: clusterId,
          weight,
          isCluster: true,
          originData: [],
          // originData,
        });
        newLocations.push(newLocation);
        newLocationMap.set(newLocation.id, newLocation);
        continue;
      }
    }
    newLocations.push(location);
    newLocationMap.set(location.id, location);
  }
  return {
    locations: newLocations.sort((a, b) => a.weight - b.weight),
    locationMap: newLocationMap,
  };
}
