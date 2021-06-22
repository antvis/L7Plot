import { IAnimateOption, IActiveOption } from '@antv/l7-core';

export type CallBack<T> = (data: Record<string, any>) => T;

/** 颜色色板 */
export type ColorsAttr = string | string[];

export interface IStyleAttribute<T> {
  field?: string | string[];
  value?: T | T[] | CallBack<T>;
}

export interface IColorStyleAttribute {
  field?: string | string[];
  value?: string | string[] | CallBack<string>;
}

export interface ISizeStyleAttribute {
  field?: string;
  value?: number | number[] | CallBack<number>;
}

export interface IRotateStyleAttribute {
  field?: string;
  value?: number | number[] | CallBack<number>;
}

export interface IShapeStyleAttribute<T> {
  field?: string | string[];
  value?: T | T[] | CallBack<T>;
}

/** 图形交互反馈 */
export interface IStateAttribute {
  active?: boolean | IActiveOption;
  select?: boolean | IActiveOption;
}

/** 颜色 */
export type ColorAttr = string | CallBack<string> | IColorStyleAttribute;

/** 大小 */
export type SizeAttr = number | CallBack<number> | ISizeStyleAttribute;

/** 旋转 */
export type RotateAttr = number | CallBack<number> | IRotateStyleAttribute;

/** 图形形状 */
export type ShapeAttr<T> = T | CallBack<T> | IShapeStyleAttribute<T>;

/** 图形动画 */
export type animateAttr = boolean | Partial<IAnimateOption>;
