import type { IActiveOption, IAnimateOption } from '@antv/l7';
import { ISourceCFG, ScaleConfig } from './common';

export type Callback<T> = (data: Record<string, any>) => T | T[];

/** 颜色色板 */
export type ColorsAttr = string | string[];

export type StyleAttribute<T> = {
  /** 映射字段 */
  field?: string | string[];
  /** 映射值 */
  value?: T | T[] | Callback<T>;
};

export type ColorStyleAttribute = {
  /** 映射字段 */
  field?: string | string[];
  /** 映射值 */
  value?: string | string[] | Callback<string>;
  /** scale 配置项 */
  scale?: ScaleConfig;
};

export type SizeStyleAttribute = {
  /** 映射字段 */
  field?: string;
  /** 映射值 */
  value?: number | number[] | Callback<number | number[]>;
  /** scale 配置项 */
  scale?: ScaleConfig;
};

export type ShapeStyleAttribute<T> = {
  /** 映射字段 */
  field?: string | string[];
  /** 映射值 */
  value?: T | T[] | Callback<T>;
  /** scale 配置项 */
  scale?: ScaleConfig;
};

export type RotateStyleAttribute = {
  /** 映射字段 */
  field?: string;
  /** 映射值 */
  value?: number | number[] | Callback<number>;
};

/** 图形交互反馈 */
export type StateAttribute = {
  /** 高亮交互 */
  active?: boolean | IActiveOption;
  /** 选中交互 */
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
  /** 映射字段 */
  field?: string | string[];
  /** 映射值 */
  value: Callback<boolean>;
};

/** Style 中的配置项 */
export type OptionStyleAttribute<T> =
  | T
  | {
      field: string;
      value: T[] | ((...params: any[]) => T);
    }
  | [string, T[] | ((...params: any[]) => T)];

/**
 * 数据配置
 */
export interface SourceOptions extends ISourceCFG {
  /** 数据 */
  data: any;
}
