import { TooltipListItem, TooltipCustomContent } from '@antv/l7plot-component';
import { anchorType as TooltipAnchorType } from '@antv/l7-utils';
import { ILngLat, Event } from './common';

export type TooltipItem = {
  field: string;
  alias?: string;
  customValue?: (value: any, properties: any, featureId: number) => any;
};

export { TooltipAnchorType };

export type TooltipOptions = {
  title?: string;
  customTitle?: (data: any) => string;
  showTitle?: boolean;
  showComponent?: boolean;
  trigger?: 'mousemove' | 'click';
  items?: string[] | TooltipItem[];
  customItems?: (data: any) => TooltipListItem[];
  className?: string;
  anchor?: TooltipAnchorType;
  offsets?: number[];
  customContent?: TooltipCustomContent;
  domStyles?: Record<string, any>;
};

export interface TooltipEvent extends Event {
  data: {
    title?: string;
    items?: TooltipListItem[];
  };
  lngLat: ILngLat;
  x: number;
  y: number;
}
