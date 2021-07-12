export interface IComponentOptions {
  /**
   * 唯一标定组件的 id
   */
  id?: string;
  /**
   * 组件名称 legend, tooltip
   */
  name?: string;
  /**
   * 容器的模板
   */
  containerTpl?: string;
  /**
   * 组件的父容器
   */
  parent?: HTMLElement | string;
  /**
   * 组件的容器样式名称
   */
  containerClassName?: string;
  /**
   * 是否显示
   */
  visible?: boolean;
  /**
   * 是否会捕捉事件
   */
  capture?: boolean;
  /**
   * 内部 DOM 的样式
   */
  domStyles?: Record<string, any>;
}
