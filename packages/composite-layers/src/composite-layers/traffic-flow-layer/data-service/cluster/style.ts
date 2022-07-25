import { ClusterStyle, FlowItem, FlowLevel, LocationItem, LocationLevel, StyleLevel } from '../types';
import { SizeAttr, ColorAttr, SizeStyleAttribute, ColorStyleAttribute } from '../../../../types';

/**
 * 判断 size 或者 color 配置是否为基于权值字段的
 * @param config
 */
function isFieldAttr(config: SizeAttr | ColorAttr | undefined) {
  return !(
    !config ||
    !(config instanceof Object) ||
    Array.isArray(config) ||
    config instanceof Function ||
    config.field !== 'weight'
  );
}

export function getStyleLevels(itemLevels: (LocationLevel | FlowLevel)[], clusterStyle: ClusterStyle): StyleLevel[] {
  const styleLevels: StyleLevel[] = [];
  // size 字段是否基于权值进行scale
  const isSizeFieldAttr = isFieldAttr(clusterStyle.size);
  // color 字段是否基于权值进行scale
  const isColorFieldAttr = isFieldAttr(clusterStyle.color);

  // 如果该图层两个配置都与权值值映射无关则直接返回空数组
  if (!isSizeFieldAttr && !isColorFieldAttr) {
    return [];
  }

  // 遍历所有数据层级
  itemLevels.forEach((itemLevel) => {
    // 获取所有数据项
    const list: (LocationItem | FlowItem)[] =
      (itemLevel as LocationLevel).locations ?? (itemLevel as FlowLevel).flows ?? [];
    if (list.length) {
      const weightList = Array.from(new Set(list.map((item) => item.weight)));
      const minWeight = Math.min(...weightList);
      const maxWeight = Math.max(...weightList);
      const newStyleLevel: StyleLevel = {
        zoom: itemLevel.zoom,
      };
      if (isSizeFieldAttr) {
        const size = clusterStyle.size as SizeStyleAttribute;
        newStyleLevel.size = {
          ...size,
          scale: {
            type: 'linear',
            domain: [minWeight, maxWeight],
            ...size.scale,
          },
        };
      }
      if (isColorFieldAttr) {
        const color = clusterStyle.color as ColorStyleAttribute;
        newStyleLevel.color = {
          ...color,
          scale: {
            type: 'linear',
            domain: [minWeight, maxWeight],
            ...color.scale,
          },
        };
      }
      styleLevels.push(newStyleLevel);
    }
  });

  return styleLevels;
}
