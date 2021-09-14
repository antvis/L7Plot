import { Grid } from '@antv/l7plot';

async function initMap() {
  const response = await fetch(
    'https://gw.alipayobjects.com/os/basement_prod/7359a5e9-3c5e-453f-b207-bc892fb23b84.csv'
  );
  const data = await response.text();

  new Grid('container', {
    map: {
      type: 'mapbox',
      style: 'dark',
      pitch: 48,
      center: [109.054293, 29.246265],
      zoom: 6,
    },
    source: {
      data: data,
      parser: {
        type: 'csv',
        x: 'lng',
        y: 'lat',
      },
      aggregation: {
        radius: 20000,
        field: 'v',
        method: 'sum',
      },
    },

    shape: 'squareColumn',
    size: {
      field: 'count',
      value: ({ count }) => {
        return count * 200;
      },
    },
    color: {
      field: 'count',
      value: [
        '#8C1EB2',
        '#8C1EB2',
        '#DA05AA',
        '#F0051A',
        '#FF2A3C',
        '#FF4818',
        '#FF4818',
        '#FF8B18',
        '#F77B00',
        '#ED9909',
        '#ECC357',
        '#EDE59C',
      ].reverse(),
    },
    style: {
      coverage: 0.9,
      angle: 0,
    },
  });
}

initMap();
