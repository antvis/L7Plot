import { ComponentOptions } from './component';

/**
 * 列表选项接口
 */
export type TooltipListItem = {
  /**
   * 唯一值，用于查找
   */
  id?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 值
   */
  value: any;

  [key: string]: any;
};

export type TooltipCustomContent = (title: string, items: TooltipListItem[]) => string | HTMLElement;

/**
 * Tooltip 配置接口
 */
export interface TooltipOptions extends ComponentOptions {
  /**
   * 标题
   */
  title?: string;
  /**
   * 是否显示标题
   */
  showTitle?: boolean;
  /**
   * 列表项集合
   */
  items: TooltipListItem[];
  /**
   * 列表项的模板
   */
  itemTpl?: string;
  /**
   * 自定义模板
   */
  customContent?: TooltipCustomContent;
  /**
   * 传入各个 dom 的样式
   */
  domStyles?: Record<string, any>;
}
