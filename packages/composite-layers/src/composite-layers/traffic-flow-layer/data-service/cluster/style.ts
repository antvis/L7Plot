import {
  ClusterColor,
  ClusterSize,
  ClusterStyle,
  FlowItem,
  FlowLevel,
  LocationItem,
  LocationLevel,
  ScaleType,
  StyleLevel,
} from '../types';
import { SCALE_TYPE_MAP } from '../constants';

function getScaleMethod<T extends ClusterColor | ClusterSize>(config: T) {
  const scaleType: ScaleType = Array.isArray(config) ? 'linear' : config.scaleType;
  const value = Array.isArray(config) ? config : config.value;
  return {
    scaleType,
    value,
  };
}

export function getStyleLevels(itemLevels: (LocationLevel | FlowLevel)[], clusterStyle: ClusterStyle): StyleLevel[] {
  const styleLevels: StyleLevel[] = [];
  const { size, color } = clusterStyle;
  if (!size && !color) {
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
      if (size) {
        const { scaleType: sizeScaleType, value: sizeValue } = getScaleMethod<ClusterSize>(size);
        const sizeScaleMethod = SCALE_TYPE_MAP[sizeScaleType]().domain([minWeight, maxWeight]).range(sizeValue);
        newStyleLevel.size = {
          field: 'weight',
          value: ({ weight }) => {
            return sizeScaleMethod(weight);
          },
        };
      }
      if (color) {
        const { scaleType: colorScaleType, value: colorValue } = getScaleMethod<ClusterColor>(color);
        const colorScaleMethod = SCALE_TYPE_MAP[colorScaleType]().domain([minWeight, maxWeight]).range(colorValue);
        newStyleLevel.color = {
          field: 'weight',
          value: ({ weight }) => {
            return colorScaleMethod(weight);
          },
        };
      }
      styleLevels.push(newStyleLevel);
    }
  });

  return styleLevels;
}
