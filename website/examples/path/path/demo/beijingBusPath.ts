import { Path } from '@antv/l7plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/1atwIMvcMo/beijinggongjiaoluxian.json')
  .then((response) => response.json())
  .then((data) => {
    new Path('container', {
      theme: 'dark',
      map: {
        type: 'amap',
        center: [116.3956, 39.9392],
        pitch: 0,
        zoom: 10,
      },
      source: {
        data: data,
        parser: {
          type: 'json',
          coordinates: 'lnglat',
        },
      },
      size: 1,
      color: {
        field: 'line_name',
        value: ['#5B8FF9', '#5CCEA1', '#5D7092'],
      },
      style: {
        opacity: 0.8,
      },
      state: { active: { color: '#FFF684' } },
      autoFit: true,
      tooltip: {
        items: ['line_name', 'line_id'],
      },
      zoom: {
        position: 'bottomright',
      },
      layerMenu: {
        position: 'topright',
      },
    });
  });
