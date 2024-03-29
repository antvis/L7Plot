import { round } from 'lodash-es';
import { CategoryLegendListItem } from '@antv/l7plot-component';
import { ILegendClassificaItem, ILegendSegmentItem } from '../../types';

type LegendItemTick = { value: number | string; color: string };
type LegendItemExtent = { value: [number, number]; color: string };

const isLegendItemI = (
  legendItems: ILegendSegmentItem[] | ILegendClassificaItem[],
): legendItems is LegendItemTick[] => {
  return !Array.isArray(legendItems[0].value);
};

export const getColorLegendItems = (
  legendItems: ILegendSegmentItem[] | ILegendClassificaItem[],
): CategoryLegendListItem[] => {
  if (isLegendItemI(legendItems)) {
    return legendItems;
  }

  // TODO: scale nice
  const items: LegendItemExtent[] = legendItems.map((item) => ({
    ...item,
    value: [round(item.value[0], 4), round(item.value[1], 4)],
  }));

  return items;
};
