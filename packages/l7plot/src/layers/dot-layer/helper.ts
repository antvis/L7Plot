type LegendItemTick = { value: number; color: string };
type LegendItemExtent = { value: [number, number]; color: string };

const isLegendItemI = (legendItems: LegendItemTick[] | LegendItemExtent[]): legendItems is LegendItemTick[] => {
  return typeof legendItems[0].value === 'number';
};

export const getColorLegendItems = (legendItems: LegendItemTick[] | LegendItemExtent[]) => {
  let items: LegendItemExtent[] = [];

  if (isLegendItemI(legendItems)) {
    if (legendItems.length === 1) return [];
    const cache = new Map<string, number[]>();

    for (let index = 0; index < legendItems.length; index++) {
      const { color, value } = legendItems[index];
      if (cache.has(color)) {
        const data = cache.get(color);
        if (Array.isArray(data)) {
          data.push(value);
        }
      } else {
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
    items = legendItems.map((item) => ({
      ...item,
      value: [Math.ceil(item.value[0]), Math.ceil(item.value[1])],
    }));
  }

  return items;
};
