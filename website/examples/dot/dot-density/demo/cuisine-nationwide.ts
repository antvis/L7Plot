import { Dot } from '@antv/l7plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/fZreT5RyVT/6wanquanguoyuecaidefenbu.geojson')
  .then((response) => response.json())
  .then((data) => {
    new Dot('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        center: [105.425968, 35.882505],
        pitch: 0,
        zoom: 4,
      },
      source: {
        data: data,
        parser: {
          type: 'geojson',
        },
      },
      shape: 'dot',
      color: '#3C1FA8',
      size: 0.5,
      style: {
        opacity: 1,
      },
      autoFit: true,
      zoom: {
        position: 'bottomright',
      },
    });
  });
