import { IControlOption } from '@antv/l7';
import { Control } from '@antv/l7-component';
import { CategoryLegendOptions, ContinueLegendOptions, CategoryLegend, ContinueLegend } from '@antv/l7plot-component';

export type LegendItem =
  | { type: 'category'; options: CategoryLegendOptions }
  | { type: 'continue'; options: ContinueLegendOptions };
export interface LegendOptions extends Partial<IControlOption> {
  items: LegendItem[];
}

export class Legend extends Control {
  /**
   * legend 的 schema 配置
   */
  protected options: LegendOptions;
  /**
   * legendComponents 实例
   */
  private legendComponents: (CategoryLegend | ContinueLegend)[] = [];

  constructor(options: LegendOptions) {
    super(options);
    this.options = options;
    this.legendComponents = this.initLegendComponents(options.items);
  }

  private initLegendComponents(legendItem: LegendItem[]) {
    const legendComponents: (CategoryLegend | ContinueLegend)[] = [];

    for (let index = 0; index < legendItem.length; index++) {
      const item = legendItem[index];
      if (item.type === 'category') {
        const legend = new CategoryLegend({
          title: item.options.title,
          items: item.options.items,
          className: item.options.className,
          customContent: item.options.customContent,
          domStyles: item.options.domStyles,
        });
        legendComponents.push(legend);
      } else if (item.type === 'continue') {
        const legend = new ContinueLegend({
          title: item.options.title,
          min: item.options.min,
          max: item.options.max,
          colors: item.options.colors,
          className: item.options.className,
          customContent: item.options.customContent,
          domStyles: item.options.domStyles,
        });
        legendComponents.push(legend);
      }
    }

    return legendComponents;
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<LegendOptions> {
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
