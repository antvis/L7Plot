import { ScaleTypes } from '@antv/l7';
import * as d3Color from 'd3-color';
import * as d3Scale from 'd3-scale';
import { ColorAttr, SizeAttr } from '../../../types';

const ScaleMap = {
  [ScaleTypes.LINEAR]: d3Scale.scaleLinear,
  [ScaleTypes.POWER]: d3Scale.scalePow,
  [ScaleTypes.LOG]: d3Scale.scaleLog,
  [ScaleTypes.SEQUENTIAL]: d3Scale.scaleSequential,
  [ScaleTypes.TIME]: d3Scale.scaleTime,
  [ScaleTypes.QUANTILE]: d3Scale.scaleQuantile,
  [ScaleTypes.QUANTIZE]: d3Scale.scaleQuantize,
  [ScaleTypes.THRESHOLD]: d3Scale.scaleThreshold,
  [ScaleTypes.CAT]: d3Scale.scaleOrdinal,
  [ScaleTypes.DIVERGING]: d3Scale.scaleDiverging,
};

const DefaultScaleType = ScaleTypes.LINEAR;

export function getSizeAttribute(sizeAttr: SizeAttr, weightRange: [number, number]): SizeAttr {
  if (sizeAttr instanceof Object && !(sizeAttr instanceof Function) && !Array.isArray(sizeAttr)) {
    const { field, value } = sizeAttr;
    if (field === 'weight' && Array.isArray(value) && value.length) {
      const scaleType = (sizeAttr.scale?.type || DefaultScaleType) as ScaleTypes;
      const scaleFunc = ScaleMap[scaleType]().domain(weightRange).range(value);
      return {
        ...sizeAttr,
        value: ({ weight }) => {
          return scaleFunc(weight);
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
      const scaleFunc = ScaleMap[scaleType]().domain(weightRange).range(value);

      return {
        ...colorAttr,
        value: ({ weight }) => {
          return scaleFunc(weight);
        },
      };
    }
  }
  return colorAttr;
}

export function getOpacityColorAttribute(
  colorAttr: ColorAttr,
  weightRange: [number, number],
  fadeOpacityAmount: number
): ColorAttr {
  if (colorAttr instanceof Object && !(colorAttr instanceof Function) && !Array.isArray(colorAttr)) {
    const { field, value } = colorAttr;
    if (field === 'weight' && value instanceof Function) {
      const scaleFunc = d3Scale.scaleLog().domain(weightRange).range([0, 1]);
      return {
        ...colorAttr,
        value: (attr: any) => {
          const color = d3Color.rgb(value(attr) as string);
          color.opacity = scaleFunc(attr.weight) / (100 / (100 - fadeOpacityAmount));
          return color.formatRgb();
        },
      };
    }
  }
  return colorAttr;
}
