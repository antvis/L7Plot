import { ClusterStyle, FlowItem, FlowLevel, LocationItem, LocationLevel, StyleLevel } from '../types';
import { SizeAttr, ColorAttr, SizeStyleAttribute, ColorStyleAttribute } from '../../../../types';

/**
 * 判断 size 或者 color 配置是否为基于字段类型的
 * @param config
 */
function isFieldAttr(config: SizeAttr | ColorAttr | undefined) {
  if (!config || !(config instanceof Object) || Array.isArray(config) || config instanceof Function) {
    return false;
  }
  return true;
}

export function getStyleLevels(itemLevels: (LocationLevel | FlowLevel)[], clusterStyle: ClusterStyle): StyleLevel[] {
  const styleLevels: StyleLevel[] = [];
  const isSizeFieldAttr = isFieldAttr(clusterStyle.size);
  const isColorFieldAttr = isFieldAttr(clusterStyle.color);
  if (!isSizeFieldAttr && !isColorFieldAttr) {
    return [];
  }
  itemLevels.forEach((itemLevel) => {
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
