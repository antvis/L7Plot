import { ScaleTypes } from '@antv/l7';
import { Log } from '@antv/scale';
import { LineLayerStyleOptions } from '../../../core-layers/line-layer/types';
import { PointLayer } from '../../../core-layers/point-layer';
import { ColorAttr, SizeAttr } from '../../../types';
import { buildIndex } from '../data/build-index';

export const DefaultScaleType = ScaleTypes.LINEAR;

export function getSizeAttribute(sizeAttr: SizeAttr, weightRange: [number, number]): SizeAttr {
  if (sizeAttr instanceof Object && !(sizeAttr instanceof Function) && !Array.isArray(sizeAttr)) {
    const { field, value } = sizeAttr;
    if (field === 'weight' && Array.isArray(value) && value.length) {
      const scaleType = (sizeAttr.scale?.type || DefaultScaleType) as ScaleTypes;
      return {
        ...sizeAttr,
        scale: {
          field: 'size',
          type: scaleType,
          domain: weightRange,
        },
      };
    }
  }
  return sizeAttr;
}

export function getColorAttribute(colorAttr: ColorAttr, weightRange: [number, number]): ColorAttr {
  if (colorAttr instanceof Object && !(colorAttr instanceof Function) && !Array.isArray(colorAttr)) {
    const { field, value } = colorAttr;
    if (field === 'weight' && Array.isArray(value) && value.length) {
      const scaleType = (colorAttr.scale?.type || DefaultScaleType) as ScaleTypes;
      return {
        ...colorAttr,
        scale: {
          field: 'color',
          type: scaleType,
          domain: weightRange,
        },
      };
    }
  }
  return colorAttr;
}

export function getOpacityColorAttribute(
  weightRange: [number, number],
  fadeOpacityAmount: number
): LineLayerStyleOptions['opacity'] {
  const scaleFunc = new Log({
    domain: weightRange,
    range: [0, 1],
  });
  const ratio = (1 - fadeOpacityAmount / 100) * 1.5;
  return {
    field: 'weight',
    value: (weight: any) => {
      return scaleFunc.map(weight) * ratio;
    },
  };
}

export function getLineOffsetsAttribute(
  clusterIndex: ReturnType<typeof buildIndex>,
  circleLayer: PointLayer
): LineLayerStyleOptions['offsets'] {
  const circleLayerSizeAttribute = circleLayer.options.size;
  if (typeof circleLayerSizeAttribute === 'number') {
    return [circleLayerSizeAttribute, circleLayerSizeAttribute];
  } else {
    const sizeScale = circleLayer?.layer?.getScale('size');
    return {
      field: 'fromId*toId',
      value: (fromId, toId) => {
        const fromCluster = clusterIndex.clusterIdMap.get(fromId);
        const toCluster = clusterIndex.clusterIdMap.get(toId);
        const fromOffset = (fromCluster ? sizeScale?.(fromCluster.weight) : 0) ?? 0;
        const toOffset = (toCluster ? sizeScale?.(toCluster.weight) : 0) ?? 0;
        return [fromOffset, toOffset] as [number, number];
      },
    };
  }
}
