import { Heatmap } from '@antv/l7plot';

async function initMap() {
  const response = await fetch('https://gw.alipayobjects.com/os/antfincdn/OOSGL1vhp3/20200726024229.json');
  const data = await response.json();

  new Heatmap('container', {
    map: {
      type: 'mapbox',
      style: 'dark',
      center: [127.5671666579043, 7.445038892195569],
      zoom: 2.632456779444394,
      pitch: 45,
    },
    source: {
      data: data,
      parser: {
        type: 'geojson',
      },
    },
    shape: 'heatmap3D',
    size: {
      field: 'avg',
      value: ({ avg }) => avg / 100,
    },
  });
}

initMap();
