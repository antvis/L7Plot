import { Source } from '@antv/l7';
import { isEqual, isPlainObject } from '@antv/util';

export * from './keypress';

function deepMix(dist: Record<string, any>, src: Record<string, any>, level: number = 0, maxLevel: number = 5) {
  for (const key in src) {
    if (Object.prototype.hasOwnProperty.call(src, key)) {
      const value = src[key];
      if (value !== null && isPlainObject(value)) {
        if (!isPlainObject(dist[key])) {
          dist[key] = {};
        }
        if (level < maxLevel) {
          deepMix(dist[key], value, level + 1, maxLevel);
        } else {
          dist[key] = src[key];
        }
      } else if (Array.isArray(value)) {
        dist[key] = [];
        dist[key] = dist[key].concat(value);
      } else if (value !== undefined) {
        dist[key] = value;
      }
    }
  }
}

const deepMixOptions = (rst: any, ...args: any[]) => {
  for (let i = 0; i < args.length; i += 1) {
    // 只进行最大 1 level 合并
    deepMix(rst, args[i], 0, 1);
  }
  return rst;
};

/**
 * 深克隆图层配置项
 */
export const deepMergeLayerOptions = <O extends { source: any }>(options: Partial<O>, srcOptions: Partial<O>): O => {
  const { source, ...restOptions } = options;
  const { source: srcSource, ...restSrcOptions } = srcOptions;
  const target = deepMixOptions({}, restOptions, restSrcOptions);

  // source 是实例的情况
  if ((srcSource as any) instanceof Source) {
    target.source = srcSource;
  } else if ((source as any) instanceof Source) {
    target.source = source;
  } else {
    target.source = { ...source, ...srcSource };
  }

  return target;
};

/**
 * 判断 source 数据是否发生改变
 */
export const isSourceChanged = <S extends { data: any } = { data: any }>(source: S, currentSource: S) => {
  // source 是实例的情况
  if (source instanceof Source && currentSource instanceof Source) {
    return source !== currentSource;
  }

  const { data, ...restOptions } = source;
  const { data: currentData, ...restCurrentOptions } = currentSource;
  const changed = data !== currentData || !isEqual(restOptions, restCurrentOptions);

  return changed;
};
