import { Hexbin } from '@antv/l7plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/Ml2DwikvFC/20210726100731.json')
  .then((response) => response.json())
  .then((data) => {
    new Hexbin('container', {
      map: {
        type: 'amap',
        style: 'dark',
        pitch: 43,
        center: [120.13383079335335, 29.9],
        zoom: 8.2,
      },
      source: {
        data: data,
        parser: {
          type: 'geojson',
        },
        aggregation: {
          radius: 1200,
          field: 'rank',
          method: 'sum',
        },
      },

      shape: 'hexagonColumn',
      size: {
        field: 'sum',
        value: ({ sum }) => {
          return sum * 10;
        },
      },
      color: {
        field: 'sum',
        value: ['#0553A1', '#0B79B0', '#10B3B0', '#7CCF98', '#DCE872'],
      },
      style: {
        coverage: 0.8,
        angle: 0,
        opacity: 1.0,
      },
    });
  });
