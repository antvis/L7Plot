import { BubbleMap } from '@antv/l7plot';

async function initMap() {
  const response = await fetch('https://gw.alipayobjects.com/os/antfincdn/m5r7MFHt8U/wenchuandizhenshuju.json');
  const { data } = await response.json();

  new BubbleMap('container', {
    map: {
      type: 'mapbox',
      style: 'dark',
      center: [102.447303, 37.753574],
      zoom: 5,
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
    zoom: {
      position: 'bottomright',
    },
    scale: {
      position: 'bottomright',
    },
    tooltip: {
      items: ['title', 'mag', 'depth'],
    },
  });
}

initMap();
