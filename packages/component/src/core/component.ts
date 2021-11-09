import { deepMix, each, isString } from '@antv/util';
import { createDom, modifyCSS } from '@antv/dom-util';
import { ComponentOptions } from '../types';
import { hasClass } from '../utils/dom';

export abstract class Component<O extends ComponentOptions = ComponentOptions> {
  /**
   * Component 的 schema 配置
   */
  public options: O;

  protected container: HTMLElement;

  protected destroyed = false;

  constructor(options: O) {
    this.options = deepMix({}, this.getDefaultOptions(), options);
    this.container = this.initContainer();
    this.initDom();
    this.applyStyles();
    this.initEvent();
    this.initCapture();
    this.initVisible();
    this.render();
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<ComponentOptions> {
    return {
      name: '',
      containerTpl: '<div></div>',
      visible: true,
      capture: true,
      domStyles: {},
    };
  }

  /**
   * 获取 container
   */
  public getContainer() {
    return this.container;
  }

  /**
   * 获取组件的父容器
   */
  protected getParentContainer() {
    const parent = this.options.parent;
    let parentContainer: HTMLElement | undefined;
    if (!parent) {
      return parentContainer;
    }

    if (isString(parent)) {
      const parentElement = document.getElementById(parent);
      if (parentElement) {
        parentContainer = parentElement;
      } else {
        throw new Error(`No parent id ${parent}`);
      }
    } else {
      parentContainer = parent;
    }

    return parentContainer;
  }

  /**
   * 初始化 container
   */
  protected initContainer() {
    const container = this.createDom(this.options.containerTpl);
    const parentContainer = this.getParentContainer();
    if (parentContainer) {
      parentContainer.appendChild(container);
    }

    return container;
  }

  /**
   * 初始化 DOM
   */
  protected abstract initDom();

  /**
   * 初始化 visible
   */
  protected initVisible() {
    if (this.options.visible) {
      this.show();
    } else {
      this.hide();
    }
  }

  /**
   * 初始化事件
   */
  protected abstract initEvent();

  /**
   * 清理事件
   */
  protected abstract removeEvent();

  /**
   * 初始 capture
   */
  protected initCapture() {
    this.setCapture(this.options.capture);
  }

  /**
   * 绘制组件
   */
  public abstract render();

  /**
   * 显示
   */
  public abstract show();

  /**
   * 隐藏
   */
  public abstract hide();

  /**
   * 更新组件
   */
  public update(options: Partial<O>) {
    this.options = deepMix({}, this.options, options);
    this.updateInner(options);
    this.afterUpdate(options);
  }

  // 更新组件样式
  protected updateInner(options: Partial<O>) {
    if (options.domStyles) {
      this.applyStyles();
    }
  }

  /**
   * 更新组件后
   */
  protected afterUpdate(options: Partial<O>) {
    // 更新时考虑capture
    if (options.capture) {
      this.setCapture(options.capture);
    }
  }

  /**
   * 是否允许捕捉事件
   */
  public setCapture(capture) {
    const container = this.container;
    const value = capture ? 'auto' : 'none';
    container.style.pointerEvents = value;
  }

  /**
   * 应用所有的样式
   */
  protected applyStyles() {
    const domStyles = this.options.domStyles;
    if (!domStyles) {
      return;
    }
    const container = this.container;
    this.applyChildrenStyles(container, domStyles);
    const className = this.options.className;
    if (className && hasClass(container, className)) {
      const containerCss = domStyles[className];
      modifyCSS(container, containerCss);
    }
  }

  /**
   * 应用样式到 DOM
   */
  protected applyChildrenStyles(element, styles) {
    each(styles, (style, name) => {
      const elements = element.getElementsByClassName(name);
      each(elements, (el) => {
        modifyCSS(el, style);
      });
    });
  }

  /**
   * 应用到单个 DOM
   */
  protected applyStyle(cssName, dom) {
    const domStyles = this.options.domStyles;
    domStyles && modifyCSS(dom, domStyles[cssName]);
  }

  /**
   * 创建 DOM
   */
  protected createDom(str = '<div></div>'): HTMLElement {
    return createDom(str);
  }

  /**
   * 清理 DOM
   */
  protected removeDom() {
    const container = this.container;
    // 节点不一定有 parentNode
    container && container.parentNode && container.parentNode.removeChild(container);
  }

  public destroy() {
    this.removeEvent();
    this.removeDom();
    this.destroyed = true;
  }
}
