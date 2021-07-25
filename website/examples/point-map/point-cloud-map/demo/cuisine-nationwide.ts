import { PointCloudMap } from '@antv/l7plot';

async function initMap() {
  const response = await fetch('https://gw.alipayobjects.com/os/antfincdn/fZreT5RyVT/6wanquanguoyuecaidefenbu.geojson');
  const data = await response.json();

  new PointCloudMap('container', {
    map: {
      type: 'mapbox',
      style: 'dark',
      center: [105.425968, 35.882505],
      pitch: 0,
      zoom: 11,
    },
    source: {
      data: data,
      parser: {
        type: 'geojson',
      },
    },

    color: '#3C1FA8',
    size: 0.5,
    style: {
      opacity: 1,
    },
    zoom: {
      position: 'bottomright',
    },
  });
}

initMap();
