import { IControlOption } from '@antv/l7-core';
import { Control } from '@antv/l7-component';
import { Legend as LegendComponent, LegendCustomContent } from '@antv/l7plot-component';

export interface ILegendItems {
  /**
   * 唯一值，用于查找
   */
  id?: string;
  /**
   * 值
   */
  value: any;
  /**
   * 颜色
   */
  color: string;
  /**
   * 名称
   */
  name?: string;
}

export interface ILegendControlOptions extends Partial<IControlOption> {
  title: string;
  items: ILegendItems[];
  className?: string;
  customContent?: LegendCustomContent;
  domStyles?: Record<string, any>;
}

export class LegendControl extends Control {
  /**
   * tooltip 的 schema 配置
   */
  protected options: ILegendControlOptions;
  /**
   * legendComponent 实例
   */
  private legendComponent: LegendComponent;

  constructor(options: ILegendControlOptions) {
    super(options);
    this.options = options;
    this.legendComponent = new LegendComponent({
      title: options.title,
      items: options.items,
      className: options.className,
      customContent: options.customContent,
      domStyles: options.domStyles,
    });
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<ILegendControlOptions> {
    return {
      items: [],
      position: 'bottomleft',
    };
  }

  public onAdd(): HTMLElement {
    const legend = this.legendComponent.getContainer();
    const container = window.document.createElement('div');
    container.className = 'l7plot-legend-container';
    container.appendChild(legend);
    return container;
  }

  public onRemove(): void {
    //
  }
}
