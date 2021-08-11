import { PositionName } from '@antv/l7-core';
import {
  CategoryLegendCustomContent,
  ICategoryLegendListItem,
  ContinueLegendCustomContent,
} from '@antv/l7plot-component';
import { LegendType } from '../component/legend';

/**
 * LegendControl
 */
export interface ILegendOptions
  extends Omit<ICategoryLegendOptions, 'customContent'>,
    Omit<IContinueLegendOptions, 'customContent'> {
  type?: LegendType;
  position?: PositionName;
  customContent?: CategoryLegendCustomContent | ContinueLegendCustomContent;
}

/**
 * CategoryLegend
 */
export interface ICategoryLegendOptions {
  title?: string;
  items?: ICategoryLegendListItem[];
  className?: string;
  customContent?: CategoryLegendCustomContent;
  domStyles?: Record<string, any>;
}

/**
 * ContinueLegend
 */
export interface IContinueLegendOptions {
  title?: string;
  min?: number;
  max?: number;
  colors?: string[];
  className?: string;
  customContent?: ContinueLegendCustomContent;
  domStyles?: Record<string, any>;
}
