import { DotDensityMap } from '@antv/l7plot';

async function initMap() {
  const response = await fetch('https://gw.alipayobjects.com/os/rmsportal/BElVQFEFvpAKzddxFZxJ.txt');
  const data = await response.text();

  new DotDensityMap('container', {
    map: {
      type: 'mapbox',
      style: 'dark',
      center: [121.417463, 31.215175],
      pitch: 0,
      zoom: 11,
    },
    source: {
      data: data,
      parser: {
        type: 'csv',
        y: 'lat',
        x: 'lng',
      },
    },

    color: '#080298',
    size: 0.5,
    style: {
      opacity: 1,
    },
    zoom: {
      position: 'bottomright',
    },
    scale: {
      position: 'bottomright',
    },
    layerMenu: {
      position: 'topright',
    },
  });
}

initMap();
