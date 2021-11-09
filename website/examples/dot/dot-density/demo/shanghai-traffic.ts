import { Dot } from '@antv/l7plot';

fetch('https://gw.alipayobjects.com/os/rmsportal/BElVQFEFvpAKzddxFZxJ.txt')
  .then((response) => response.text())
  .then((data) => {
    new Dot('container', {
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
      shape: 'dot',
      color: '#080298',
      size: 0.5,
      style: {
        opacity: 1,
      },
      zoom: {
        position: 'bottomright',
      },
      scale: {
        position: 'bottomleft',
      },
      layerMenu: {
        position: 'topright',
      },
    });
  });
