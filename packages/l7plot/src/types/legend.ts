import { PositionName } from '@antv/l7-core';
import {
  CategoryLegendCustomContent,
  CategoryLegendListItem,
  ContinueLegendCustomContent,
} from '@antv/l7plot-component';
import { LegendType } from '../component/legend';

/**
 * LegendControl
 */
export interface LegendOptions
  extends Omit<CategoryLegendOptions, 'customContent'>,
    Omit<ContinueLegendOptions, 'customContent'> {
  type?: LegendType;
  position?: PositionName;
  customContent?: CategoryLegendCustomContent | ContinueLegendCustomContent;
}

/**
 * CategoryLegend
 */
export type CategoryLegendOptions = {
  title?: string;
  items?: CategoryLegendListItem[];
  className?: string;
  customContent?: CategoryLegendCustomContent;
  domStyles?: Record<string, any>;
};

/**
 * ContinueLegend
 */
export type ContinueLegendOptions = {
  title?: string;
  min?: number;
  max?: number;
  colors?: string[];
  className?: string;
  customContent?: ContinueLegendCustomContent;
  domStyles?: Record<string, any>;
};
