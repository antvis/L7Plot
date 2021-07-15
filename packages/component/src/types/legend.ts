import { IComponentOptions } from './component';

/**
 * 列表选项接口
 */
export interface ILegendListItem {
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
  value: any;

  [key: string]: any;
}

export type LegendCustomContent = (title: string, items: ILegendListItem[]) => string | HTMLElement;

/**
 * Legend 配置接口
 */
export interface ILegendOptions extends IComponentOptions {
  /**
   * 标题
   */
  title?: string;
  /**
   * 列表项集合
   */
  items: ILegendListItem[];
  /**
   * 列表项的模板
   */
  itemTpl?: string;
  /**
   * 自定义模板
   */
  customContent?: LegendCustomContent;
  /**
   * 传入各个 dom 的样式
   */
  domStyles?: Record<string, any>;
}
