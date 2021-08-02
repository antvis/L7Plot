import { deepMix, isString, substitute } from '@antv/util';
import { modifyCSS } from '@antv/dom-util';
import DomStyles from './theme';
import { CONTAINER_CLASS, CONTAINER_TPL, TITLE_CLASS, RIBBON_CONTAINER_CLASS, RIBBON_TPL } from './constants';
import { Component } from '../../core/component';
import { ContinueLegendCustomContent, IContinueLegendOptions } from '../../types';
import { clearDom } from '../../utils/dom';

export class ContinueLegend<O extends IContinueLegendOptions = IContinueLegendOptions> extends Component<O> {
  /**
   * 缓存 title DOM
   */
  protected titleDom!: HTMLElement;
  /**
   * 缓存 ribbon DOM
   */
  protected ribbonContainerDom!: HTMLElement;

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<IContinueLegendOptions> {
    return deepMix({}, super.getDefaultOptions(), {
      id: 'l7plot-continue-legend',
      name: 'l7plot-continue-legend',
      title: '',
      containerTpl: CONTAINER_TPL,
      ribbonTpl: RIBBON_TPL,
      domStyles: DomStyles,
      className: CONTAINER_CLASS,
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
    const ribbonContainerDom = container.getElementsByClassName(RIBBON_CONTAINER_CLASS)[0];
    this.titleDom = titleDom as HTMLElement;
    this.ribbonContainerDom = ribbonContainerDom as HTMLElement;
  }

  /**
   * 绘制组件
   */
  public render() {
    if (this.options.customContent) {
      this.renderCustomContent(this.options.customContent);
    } else {
      this.resetTitle();
      this.renderRibbon();
    }
  }

  /**
   * 显示
   */
  public show() {
    const container = this.container;
    if (!container || this.destroyed) return;
    modifyCSS(container, {
      visibility: 'visible',
    });
  }

  /**
   * 隐藏
   */
  public hide() {
    const container = this.container;
    if (!container || this.destroyed) return;
    modifyCSS(container, {
      visibility: 'hidden',
    });
  }

  /**
   * 更新
   */
  protected updateInner(options: Partial<O>) {
    if (this.options.customContent) {
      this.renderCustomContent(this.options.customContent);
    } else {
      if (options.title) {
        this.resetTitle();
      }
      if (options.colors) {
        this.renderRibbon();
      }
    }
    super.updateInner(options);
  }

  /**
   * 根据 customContent 渲染 DOM
   */
  private renderCustomContent(customContent: ContinueLegendCustomContent) {
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
  private getHtmlContentNode(customContent: ContinueLegendCustomContent) {
    let node: HTMLElement;
    const element = customContent(this.options.title || '', this.options.min, this.options.max, this.options.colors);
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
    if (title) {
      this.showTitle();
      this.setTitle(title);
    } else {
      this.hideTitle();
    }
  }

  /**
   * 显示 title
   */
  public showTitle() {
    const titleDom = this.titleDom;
    if (titleDom) {
      modifyCSS(titleDom, {
        display: 'block',
      });
    }
  }

  /**
   * 隐藏 title
   */
  public hideTitle() {
    const titleDom = this.titleDom;
    if (titleDom) {
      modifyCSS(titleDom, {
        display: 'none',
      });
    }
  }

  /**
   * 设置 title 内容
   */
  private setTitle(content: string) {
    const titleDom = this.titleDom;
    if (titleDom) {
      titleDom.innerHTML = content;
    }
  }

  /**
   * 渲染色带
   */
  private renderRibbon() {
    this.clearRibbonContainerDoms();
    const { min, max, colors, ribbonTpl = RIBBON_TPL } = this.options;
    const ribbonContainerDom = this.ribbonContainerDom;
    if (ribbonContainerDom) {
      const backgroundImage = `linear-gradient(to right, ${colors.join(', ')})`;
      const substituteObj = { min, max, backgroundImage };
      const domStr = substitute(ribbonTpl, substituteObj);
      const dom = this.createDom(domStr);
      ribbonContainerDom.appendChild(dom);
      this.applyChildrenStyles(ribbonContainerDom, this.options.domStyles);
    }
  }

  /**
   * 清空色带 DOM 下的 DOM 元素
   */
  private clearRibbonContainerDoms() {
    if (this.ribbonContainerDom) {
      clearDom(this.ribbonContainerDom);
    }
  }

  /**
   * 清空所有
   */
  public clear() {
    this.setTitle('');
    this.clearRibbonContainerDoms();
  }
}
