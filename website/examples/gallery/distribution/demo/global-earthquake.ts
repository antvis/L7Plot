import { Dot } from '@antv/l7plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/uvnCDHPafR/quanqiudizhenshuju.json')
  .then((response) => response.json())
  .then((data) => {
    const depthColors = ['#D60352', '#F86615', '#F86615', '#F86615', '#F86615'];

    new Dot('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        center: [18.159446, 6.547895],
        zoom: 2,
        pitch: 0,
      },
      source: {
        data: data,
        parser: { type: 'geojson' },
      },
      color: {
        field: 'depth',
        value: ({ depth }) => {
          const index = ~~((depth / 120) * depthColors.length) % depthColors.length;
          return depthColors[index];
        },
      },
      size: {
        field: 'level',
        value: ({ level }) => {
          if (level < 7) {
            return level / 2;
          }
          return level;
        },
      },
      style: {
        opacity: 0.8,
        strokeWidth: 0,
      },
      state: { active: true },
      label: {
        visible: false,
        field: 'level',
        style: {
          fill: '#fff',
          fontSize: 12,
          textAnchor: 'center',
          padding: [10, 10],
        },
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
      tooltip: {
        items: [
          { field: 'addr', alias: 'addr' },
          { field: 'level', alias: 'level' },
          { field: 'depth', alias: 'depth' },
        ],
      },
    });
  });
