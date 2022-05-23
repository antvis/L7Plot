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

/**
 * 数据配置
 */
export interface SourceOptions extends ISourceCFG {
  data: any;
}
