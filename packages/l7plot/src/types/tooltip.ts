import { ITooltipListItem, TooltipCustomContent } from '@antv/l7plot-component';
import { anchorType as TooltipAnchorType } from '@antv/l7-utils';

export interface ITooltipItem {
  field: string;
  alias?: string;
  customValue?: (value: any, properties: any, featureId: number) => any;
}

export { TooltipAnchorType };

export interface ITooltipOptions {
  title?: string;
  customTitle?: (data: any) => string;
  showTitle?: boolean;
  trigger?: 'mousemove' | 'click';
  items?: string[] | ITooltipItem[];
  customItems?: (data: any) => ITooltipListItem[];
  className?: string;
  anchor?: TooltipAnchorType;
  offsets?: number[];
  customContent?: TooltipCustomContent;
  domStyles?: Record<string, any>;
}
