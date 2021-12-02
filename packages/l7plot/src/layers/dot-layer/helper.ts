type LegendItemTick = { value: number; color: string };
type LegendItemExtent = { value: [number, number]; color: string };

const isLegendItemI = (legendItems: LegendItemTick[] | LegendItemExtent[]): legendItems is LegendItemTick[] => {
  return typeof legendItems[0].value === 'number';
};

export const getColorLegendItems = (legendItems: LegendItemTick[] | LegendItemExtent[]) => {
  let items: LegendItemExtent[] = [];

  if (isLegendItemI(legendItems)) {
    if (legendItems.length === 1) {
      const { color, value } = legendItems[0];
      const range = [value, value] as [number, number];
      return [{ color, value: range }];
    }

    const cache = new Map<string, number[]>();
    let preCacheData: number[] | undefined;
    for (let index = 0; index < legendItems.length; index++) {
      const { color, value } = legendItems[index];
      if (cache.has(color)) {
        const data = cache.get(color);
        if (Array.isArray(data)) {
          data.push(value);
        }
      } else {
        const range = [value];
        cache.set(color, range);
        if (preCacheData) {
          preCacheData.push(value);
        }
        preCacheData = range;
      }
    }

    cache.forEach((value, color) => {
      const min = value[0];
      const max = value[value.length - 1];
      const range: [number, number] = [min, max];
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
