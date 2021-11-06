import { ComponentOptions } from './component';

/**
 * 分类列表项接口
 */
export type CategoryLegendListItem = {
  /**
   * 唯一值，用于查找
   */
  id?: string;
  /**
   * 颜色
   */
  color: string;
  /**
   * 值
   */
  value: [number, number] | [string, string] | string;

  [key: string]: any;
};

export type CategoryLegendCustomContent = (title: string, items: CategoryLegendListItem[]) => string | HTMLElement;

/**
 * 分类 Legend 配置接口
 */
export interface CategoryLegendOptions extends ComponentOptions {
  /**
   * 标题
   */
  title?: string;
  /**
   * 列表项集合
   */
  items: CategoryLegendListItem[];
  /**
   * 列表项的模板
   */
  itemTpl?: string;
  /**
   * 自定义模板
   */
  customContent?: CategoryLegendCustomContent;
  /**
   * 传入各个 dom 的样式
   */
  domStyles?: Record<string, any>;
}

export type ContinueLegendCustomContent = (
  title: string,
  min: number,
  max: number,
  colors: string[]
) => string | HTMLElement;

/**
 * 连续 Legend 配置接口
 */
export interface ContinueLegendOptions extends ComponentOptions {
  /**
   * 标题
   */
  title?: string;
  /**
   * 范围的最小值
   */
  min: number;
  /**
   * 范围的最大值
   */
  max: number;
  /**
   * 图例的颜色
   */
  colors: string[];
  /**
   * 色带的模板
   */
  ribbonTpl?: string;
  /**
   * 自定义模板
   */
  customContent?: ContinueLegendCustomContent;
  /**
   * 传入各个 dom 的样式
   */
  domStyles?: Record<string, any>;
}
