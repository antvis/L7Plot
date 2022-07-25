import { ClusterOptions, H3ClusterOptions, HCAClusterOptions, LocationItem, LocationLevel, MapStatus } from '../types';
import { getLocationLevelsByHCA } from './hca';
import KDBush from 'kdbush';
import { getLocationLevelsByH3 } from './h3';

/**
 * 生成kdbush搜索树
 * @param locations
 */
export function getSearchTree(locations: LocationItem[]): KDBush<LocationItem> {
  return new KDBush<LocationItem>(
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
  if (clusterType === 'H3') {
    return getLocationLevelsByH3(locations, clusterOptions as H3ClusterOptions, mapStatus);
  }
  // 其他内置算法可在此扩展
  console.error('无匹配聚合算法');
  return [];
}
