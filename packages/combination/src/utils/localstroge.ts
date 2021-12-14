export interface ICache {
  [name: string]: string;
}
const IconSourceKey = 'L7Plot_Combintarin_Icons';

export function getIconCache(): ICache {
  const cache = window.localStorage.getItem(IconSourceKey);
  if (cache) {
    return JSON.parse(cache as string);
  }
  return {};
}

export function addIconIntoCache(name: string, url: string): ICache {
  const cache = getIconCache();
  if (!cache[name]) {
    cache[name] = url;
    window.localStorage.setItem(IconSourceKey, JSON.stringify(cache));
  }
  return cache;
}

export function deleteIconFromIcon(name: string) {
  const cache = getIconCache();
  delete cache[name];
  window.localStorage.setItem(IconSourceKey, JSON.stringify(cache));
}

export function clearIconCache() {
  window.localStorage.setItem(IconSourceKey, JSON.stringify({}));
}
