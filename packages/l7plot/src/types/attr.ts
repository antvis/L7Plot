import { ScaleTypeName, IAnimateOption, IActiveOption } from '@antv/l7-core';

export type Callback<T> = (data: Record<string, any>) => T | T[];

/** 颜色色板 */
export type ColorsAttr = string | string[];

export interface IStyleAttribute<T> {
  field?: string | string[];
  value?: T | T[] | Callback<T>;
}

export interface IColorStyleAttribute {
  field?: string | string[];
  value?: string | string[] | Callback<string>;
  type?: ScaleTypeName;
}

export interface ISizeStyleAttribute {
  field?: string;
  value?: number | number[] | Callback<number>;
  type?: ScaleTypeName;
}

export interface IRotateStyleAttribute {
  field?: string;
  value?: number | number[] | Callback<number>;
  type?: ScaleTypeName;
}

export interface IShapeStyleAttribute<T> {
  field?: string | string[];
  value?: T | T[] | Callback<T>;
  type?: ScaleTypeName;
}

/** 图形交互反馈 */
export interface IStateAttribute {
  active?: boolean | IActiveOption;
  select?: boolean | IActiveOption;
}

/** 颜色 */
export type ColorAttr = string | Callback<string> | IColorStyleAttribute;

/** 大小 */
export type SizeAttr = number | Callback<number> | ISizeStyleAttribute;

/** 旋转 */
export type RotateAttr = number | Callback<number> | IRotateStyleAttribute;

/** 图形形状 */
export type ShapeAttr<T> = T | Callback<T> | IShapeStyleAttribute<T>;

/** 图形动画 */
export type AnimateAttr = boolean | Partial<IAnimateOption>;

/** 聚合方法 */
export type AggregationMethod = 'count' | 'max' | 'min' | 'sum' | 'mean';

/** 网格聚合 */
export interface IGridAggregation {
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
  type?: AggregationMethod;
}
