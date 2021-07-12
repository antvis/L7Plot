import { deepMix, each, isString, substitute } from '@antv/util';
import { modifyCSS } from '@antv/dom-util';
import DomStyles from './theme';
import { CONTAINER_CLASS, CONTAINER_TPL, ITEM_TPL, LIST_CLASS, TITLE_CLASS } from './constants';
import { Component } from '../core/component';
import { CustomContent, ITooltipOptions } from '../types';
import { clearDom } from '../utils/dom';

export class Tooltip<O extends ITooltipOptions = ITooltipOptions> extends Component<O> {
  /**
   * 缓存 title DOM
   */
  protected titleDom!: HTMLElement;
  /**
   * 缓存 list DOM
   */
  protected listDom!: HTMLElement;

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<ITooltipOptions> {
    return deepMix({}, super.getDefaultOptions(), {
      id: 'l7plot-tooltip',
      name: 'l7plot-tooltip',
      title: '',
      showTitle: true,
      items: [],
      containerTpl: CONTAINER_TPL,
      itemTpl: ITEM_TPL,
      domStyles: DomStyles,
      containerClassName: CONTAINER_CLASS,
    });
  }

  /**
   * 初始化 container
   */
  protected initContainer() {
    const { customContent } = this.options;
    if (customContent) {
      const container = this.getHtmlContentNode(customContent);
      const parentContainer = this.getParentContainer();
      if (parentContainer) {
        parentContainer.appendChild(container);
      }
      return container;
    } else {
      return super.initContainer();
    }
  }

  /**
   * 初始化 DOM
   */
  protected initDom() {
    this.cacheDoms();
  }

  /**
   * 初始化事件
   */
  protected initEvent() {
    //
  }

  /**
   * 清理事件
   */
  protected removeEvent() {
    //
  }

  /**
   * 缓存 DOM
   */
  private cacheDoms() {
    const container = this.container;
    const titleDom = container.getElementsByClassName(TITLE_CLASS)[0];
    const listDom = container.getElementsByClassName(LIST_CLASS)[0];
    this.titleDom = titleDom as HTMLElement;
    this.listDom = listDom as HTMLElement;
  }

  /**
   * 绘制组件
   */
  public render() {
    if (this.options.customContent) {
      this.renderCustomContent(this.options.customContent);
    } else {
      this.resetTitle();
      this.renderItems();
    }
  }

  /**
   * 显示
   */
  public show() {
    const container = this.container;
    if (!container || this.destroyed) {
      // 防止容器不存在或者被销毁时报错
      return;
    }
    modifyCSS(container, {
      visibility: 'visible',
    });
  }

  /**
   * 隐藏
   */
  public hide() {
    const container = this.container;
    if (!container || this.destroyed) {
      return;
    }
    modifyCSS(container, {
      visibility: 'hidden',
    });
  }

  // 更新属性的同时，可能会引起 DOM 的变化，这里对可能引起 DOM 变化的场景做了处理
  protected updateInner(options: Partial<O>) {
    if (this.options.customContent) {
      this.renderCustomContent(this.options.customContent);
    } else {
      if (options.title && options.showTitle !== undefined) {
        this.resetTitle();
      }
      if (options.items) {
        this.renderItems();
      }
    }
    super.updateInner(options);
  }

  /**
   * 根据 customContent 渲染 DOM
   */
  private renderCustomContent(customContent: CustomContent) {
    const parentContainer = this.container.parentNode;
    const node = this.getHtmlContentNode(customContent);
    const curContainer = this.container;

    if (parentContainer) {
      parentContainer.replaceChild(node, curContainer);
    }

    this.container = node;
    this.applyStyles();
  }

  /**
   * 生成自定义内容 DOM
   */
  private getHtmlContentNode(customContent: CustomContent) {
    let node: HTMLElement;
    const element = customContent(this.options.title, this.options.items);
    if (isString(element)) {
      node = this.createDom(element);
    } else {
      node = element;
    }

    return node;
  }

  /**
   * 重置 title
   */
  private resetTitle() {
    const title = this.options.title;
    const showTitle = this.options.showTitle;
    if (showTitle && title) {
      this.setTitle(title);
    } else {
      this.setTitle('');
    }
  }

  /**
   * 设置 title 文本
   */
  private setTitle(text) {
    const titleDom = this.titleDom;
    if (titleDom) {
      titleDom.innerText = text;
    }
  }

  /**
   * 渲染每项 item
   */
  private renderItems() {
    this.clearItemDoms();
    const items = this.options.items;
    const itemTpl = this.options.itemTpl || ITEM_TPL;
    const listDom = this.listDom;
    if (listDom) {
      each(items, (item) => {
        const color = item.color;
        const substituteObj = {
          ...item,
          color,
        };

        const domStr = substitute(itemTpl, substituteObj);
        const itemDom = this.createDom(domStr);
        listDom.appendChild(itemDom);
      });
      this.applyChildrenStyles(listDom, this.options.domStyles);
    }
  }

  /**
   * 清空 list DOM 下的 DOM 元素
   */
  private clearItemDoms() {
    if (this.listDom) {
      clearDom(this.listDom);
    }
  }

  /**
   * 清空所有
   */
  public clear() {
    this.setTitle('');
    this.clearItemDoms();
  }
}
