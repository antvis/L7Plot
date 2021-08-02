import { ICategoryLegendListItem } from '@antv/l7plot-component';

type LegendItemT = { value: [number, number]; color: string };
type LegendItemI = { value: number; color: string };

export const getColorLegendItems = (legendItems: LegendItemI[] | LegendItemT[]): ICategoryLegendListItem[] => {
  // TODO: type
  let items: LegendItemT[] = [];
  items = [];

  if (typeof legendItems[0].value === 'number') {
    if (legendItems.length === 1) {
      return [{ color: legendItems[0].color, value: legendItems[0].value }];
    }
    items = legendItems
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .filter((item, index) => {
        return legendItems.findIndex(({ color }) => color === item.color) === index;
      })
      .map((item, index) => {
        let value: [number, number];
        if (index === legendItems.length - 1) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          value = [legendItems[index - 1].value, item.value];
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          value = [item.value, legendItems[index + 1].value];
        }
        return { value: value, color: item.color };
      });
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    items = legendItems.map((item) => ({ ...item, value: item.value.map((value) => Math.ceil(value)) }));
  }

  return items.map((item) => ({ ...item, value: item.value.join('-') }));
};
