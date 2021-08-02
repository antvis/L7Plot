import { ICategoryLegendListItem } from '@antv/l7plot-component';

type LegendItemT = { value: [number, number]; color: string };
type LegendItemI = { value: number; color: string };

export const getColorLegendItems = (legendItems: LegendItemI[] | LegendItemT[]): ICategoryLegendListItem[] => {
  // TODO: type
  let items: LegendItemT[] = [];

  if (typeof legendItems[0].value === 'number') {
    if (legendItems.length === 1) {
      return [{ color: legendItems[0].color, value: legendItems[0].value }];
    }
    const cache = new Map<string, number[]>();
    for (let index = 0; index < legendItems.length; index++) {
      const { color, value } = legendItems[index];
      if (cache.has(color)) {
        const data = cache.get(color);
        if (Array.isArray(data)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          data.push(value);
        }
      } else {
        // const data = preValue ? [preValue] : [value];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cache.set(color, [value]);
      }
    }

    let preValue: number;
    cache.forEach((value, color) => {
      const min = value[0];
      const max = value[value.length - 1];
      const range: [number, number] = [preValue ? preValue : min, max];
      preValue = max;
      items.push({ color, value: range });
    });
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    items = legendItems.map((item) => ({ ...item, value: item.value.map((value) => Math.ceil(value)) }));
  }

  return items.map((item) => ({ ...item, value: item.value.join('-') }));
};
