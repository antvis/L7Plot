import { Grid } from '@antv/l7plot';

async function initMap() {
  const response = await fetch('https://gw.alipayobjects.com/os/antfincdn/aBQAMIpvPL/qingdao_500m.csv');
  const data = await response.text();

  new Grid('container', {
    map: {
      type: 'mapbox',
      style: 'dark',
      pitch: 0,
      zoom: 8.6,
      center: [120.198254, 36.265551],
    },
    source: {
      data: data,
      parser: {
        type: 'csv',
        x: 'lng',
        y: 'lat',
      },
      aggregation: {
        radius: 1000,
        field: 'count',
        method: 'sum',
      },
    },

    shape: 'square',
    color: {
      field: 'count',
      value: ['#0868AC', '#43A2CA', '#43A2CA', '#7BCCC4', '#BAE4BC', '#F0F9E8', '#F0F9E8'],
    },
    style: {
      coverage: 0.9,
      angle: 0,
    },
  });
}

initMap();
