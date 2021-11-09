import { Dot } from '@antv/l7plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/m5r7MFHt8U/wenchuandizhenshuju.json')
  .then((response) => response.json())
  .then(({ data }) => {
    new Dot('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        center: [103.447303, 31.753574],
        zoom: 7,
        pitch: 0,
      },
      source: {
        data: data,
        parser: {
          type: 'json',
          x: 'lng',
          y: 'lat',
        },
      },
      color: {
        field: 'mag',
        value: ({ mag }) => {
          if (mag > 7) {
            return '#82cf9c';
          } else if (mag <= 7 && mag >= 5.5) {
            return '#10b3b0';
          } else {
            return '#2033ab';
          }
        },
      },
      size: {
        field: 'mag',
        value: ({ mag }) => (mag - 4.3) * 10,
      },
      style: {
        opacity: 0.8,
        strokeWidth: 0,
      },
      state: { active: { color: '#FFF684' } },
      autoFit: true,
      zoom: {
        position: 'bottomright',
      },
      scale: {
        position: 'bottomleft',
      },
      tooltip: {
        items: ['title', 'mag', 'depth'],
      },
    });
  });
