import type { PositionName } from '@antv/l7';
import {
  CategoryLegendCustomContent,
  CategoryLegendListItem,
  ContinueLegendCustomContent,
} from '@antv/l7plot-component';

/**
 * LegendControl
 */
export type LegendOptions = CategoryLegendOptions | ContinueLegendOptions;

/**
 * CategoryLegend
 */
export type CategoryLegendOptions = {
  type?: 'category';
  title?: string;
  items?: CategoryLegendListItem[];
  className?: string;
  customContent?: CategoryLegendCustomContent;
  domStyles?: Record<string, any>;
  position?: PositionName;
};

/**
 * ContinueLegend
 */
export type ContinueLegendOptions = {
  type?: 'continue';
  title?: string;
  min?: number;
  max?: number;
  colors?: string[];
  className?: string;
  customContent?: ContinueLegendCustomContent;
  domStyles?: Record<string, any>;
  position?: PositionName;
};
