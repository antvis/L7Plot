import { ILegendItems } from '../../component/legend';

type LegendItemT = { value: [number, number]; color: string };
type LegendItemI = { value: number; color: string };

export const getColorLegendItems = (legendItems: LegendItemI[] | LegendItemT[]): ILegendItems[] => {
  // TODO: type
  let items: LegendItemT[] = [];
  items = [];

  if (typeof legendItems[0].value === 'number') {
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
    items = legendItems.slice();
  }

  return items.map((item) => ({ ...item, value: item.value[1] }));
};
