import { IAnimateOption, IActiveOption } from '@antv/l7-core';
import { ScaleConfig, ISourceCFG } from './common';

export type Callback<T> = (data: Record<string, any>) => T | T[];

/** 颜色色板 */
export type ColorsAttr = string | string[];

export type StyleAttribute<T> = {
  field?: string | string[];
  value?: T | T[] | Callback<T>;
};

export type ColorStyleAttribute = {
  field?: string | string[];
  value?: string | string[] | Callback<string>;
  scale?: ScaleConfig;
};

export type SizeStyleAttribute = {
  field?: string;
  value?: number | number[] | Callback<number | number[]>;
  scale?: ScaleConfig;
};

export type ShapeStyleAttribute<T> = {
  field?: string | string[];
  value?: T | T[] | Callback<T>;
  scale?: ScaleConfig;
};

export type RotateStyleAttribute = {
  field?: string;
  value?: number | number[] | Callback<number>;
};

/** 图形交互反馈 */
export type StateAttribute = {
  active?: boolean | IActiveOption;
  select?: boolean | IActiveOption;
};

/** 颜色 */
export type ColorAttr = string | Callback<string> | ColorStyleAttribute;

/** 大小 */
export type SizeAttr = number | number[] | Callback<number | number[]> | SizeStyleAttribute;

/** 旋转 */
export type RotateAttr = number | Callback<number> | RotateStyleAttribute;

/** 图形形状 */
export type ShapeAttr<T> = T | Callback<T> | ShapeStyleAttribute<T>;

/** 图形动画 */
export type AnimateAttr = boolean | Partial<IAnimateOption>;

/** 纹理贴图 */
export type TextureAttr = string;

/** 比例尺 */
export type ScaleAttr = Record<string, ScaleConfig>;

/** 数据过滤 */
export type FilterAttr = {
  field?: string | string[];
  value: Callback<boolean>;
};

/** 聚合方法 */
export type AggregationMethod = 'count' | 'max' | 'min' | 'sum' | 'mean';

/** 网格聚合 */
export type GridAggregation = {
  /**
   * 聚合类型
   */
  type?: 'grid' | 'hexagon';
  /**
   * 聚合字段
   */
  field: string;
  /**
   * 网格半径
   */
  radius?: number;
  /**
   * 聚合方法
   */
  method?: AggregationMethod;
};

/**
 * 数据配置
 */
export interface SourceOptions extends ISourceCFG {
  data: any;
  /**
   * 网格聚合
   */
  aggregation?: GridAggregation;
}
