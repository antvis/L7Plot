import { CategoryLegendListItem } from '@antv/l7plot-component';

type LegendItemTick = { value: number | string; color: string };
type LegendItemExtent = { value: [number, number]; color: string };

const isLegendItemI = (legendItems: LegendItemTick[] | LegendItemExtent[]): legendItems is LegendItemTick[] => {
  return !Array.isArray(legendItems[0].value);
};

export const getColorLegendItems = (legendItems: LegendItemTick[] | LegendItemExtent[]): CategoryLegendListItem[] => {
  if (isLegendItemI(legendItems)) {
    return legendItems;
  }

  // const items: LegendItemExtent[] = legendItems.map((item) => ({
  //   ...item,
  //   value: [Math.ceil(item.value[0]), Math.ceil(item.value[1])],
  // }));

  return legendItems;
};
