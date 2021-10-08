/**
 * 缓存的行政数据
 */
export const AREA_CACHE = new Map<string, any>();

export function registerCacheArea(key: string, area: any) {
  AREA_CACHE.set(key, area);
}

export function registerCacheAreas(areaList: { key: string; area: any }[]) {
  areaList.forEach((item) => {
    AREA_CACHE.set(item.key, item.area);
  });
}

export function getCacheArea(key: string) {
  return AREA_CACHE.get(key);
}

export function hasCacheArea(key: string) {
  return AREA_CACHE.has(key);
}

export function unregisterCacheArea(key: string) {
  return AREA_CACHE.delete(key);
}
