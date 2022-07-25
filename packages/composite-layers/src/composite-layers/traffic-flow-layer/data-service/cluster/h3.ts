import { H3ClusterOptions, LocationItem, LocationLevel, LocationMap, MapStatus } from '../types';
import { getSearchTree } from './location';
import { geoToH3, h3ToGeo } from 'h3-js';
import { createLocationItem } from '../init';
import { createUuid } from '../utils';

/**
 * HCA点聚合算法
 * @param locations
 * @param clusterOptions
 * @param mapStatus
 */
export function getLocationLevelsByH3(
  locations: LocationItem[],
  clusterOptions: H3ClusterOptions,
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

  const oldLocations = [...locations];
  const oldTree = getSearchTree(oldLocations);
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
    const h3Level = zoom - 5;
    const [minH3Level, maxH3Level] = clusterOptions.h3Range;
    if (h3Level < minH3Level || h3Level > maxH3Level) {
      continue;
    }
    const h3IndexMap = new Map<string, LocationItem[]>();
    oldLocations.forEach((location) => {
      const { lat, lng } = location;
      const h3Index = geoToH3(lat, lng, h3Level);
      h3IndexMap.set(h3Index, [...(h3IndexMap.get(h3Index) ?? []), location]);
    });
    const newLocations: LocationItem[] = [];
    const newLocationMap: LocationMap = new Map();
    h3IndexMap.forEach((locations, h3Index) => {
      const [lat, lng] = h3ToGeo(h3Index);
      const newLocation = createLocationItem({
        id: createUuid(),
        lng,
        lat,
        weight: locations.map((item) => item.weight).reduce((a, b) => a + b, 0),
        childIds: locations.map((item) => item.id),
        isCluster: true,
        originData: [],
      });
      locations.forEach((location) => {
        location.parentIds = [...(location.parentIds ?? []), newLocation.id];
      });
      newLocations.push(newLocation);
      newLocationMap.set(newLocation.id, newLocation);
    });
    locationLevels.push({
      zoom,
      locations: newLocations,
      locationMap: newLocationMap,
      locationTree: getSearchTree(newLocations),
    });
  }
  return locationLevels;
}
