import { anchorType } from '@antv/l7-utils';
export interface ITooltip {
  title?: string;
  showTitle?: boolean;
  trigger?: 'mousemove' | 'click';
  className: string;
  anchor: anchorType[any];
  offsets: number[];
  maxWidth: string;
  customContent?: (data: any) => string;
}
