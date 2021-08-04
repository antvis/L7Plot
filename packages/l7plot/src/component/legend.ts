import { IControlOption } from '@antv/l7-core';
import { Control } from '@antv/l7-component';
import { ICategoryLegendOptions, IContinueLegendOptions, CategoryLegend, ContinueLegend } from '@antv/l7plot-component';

export type LegendType = 'category' | 'continue';

export type LegendItem = {
  type: LegendType;
  options: ICategoryLegendOptions & IContinueLegendOptions;
};

export interface ILegendOptions extends Partial<IControlOption> {
  items: LegendItem[];
}

export class Legend extends Control {
  /**
   * legend 的 schema 配置
   */
  protected options: ILegendOptions;
  /**
   * legendComponents 实例
   */
  private legendComponents: (CategoryLegend | ContinueLegend)[] = [];

  constructor(options: ILegendOptions) {
    super(options);
    this.options = options;
    this.legendComponents = this.initLegendComponents(options.items);
  }

  private initLegendComponents(legendItem: LegendItem[]) {
    const legendComponents: (CategoryLegend | ContinueLegend)[] = [];

    for (let index = 0; index < legendItem.length; index++) {
      const { type, options } = legendItem[index];
      if (type === 'category') {
        const legend = new CategoryLegend({
          title: options.title,
          items: options.items,
          className: options.className,
          customContent: options.customContent,
          domStyles: options.domStyles,
        });
        legendComponents.push(legend);
      } else if (type === 'continue') {
        const legend = new ContinueLegend({
          title: options.title,
          min: options.min,
          max: options.max,
          colors: options.colors,
          className: options.className,
          customContent: options.customContent,
          domStyles: options.domStyles,
        });
        legendComponents.push(legend);
      }
    }

    return legendComponents;
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<ILegendOptions> {
    return {
      position: 'bottomleft',
    };
  }

  public onAdd(): HTMLElement {
    const container = window.document.createElement('div');
    container.className = 'l7plot-legend-container';
    this.legendComponents.forEach((legendComponent) => {
      const legend = legendComponent.getContainer();
      container.appendChild(legend);
    });

    return container;
  }

  public onRemove() {
    this.legendComponents.forEach((legendComponent) => {
      legendComponent.destroy();
    });
  }
}
