import { Dot } from '@antv/l7plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/UvXSmhbwQx/zhongguochengshirenkoushuliangjiGDPpaihang.json')
  .then((response) => response.json())
  .then((data) => {
    const colors = [
      'rgba(254,255,198,0.95)',
      'rgba(255,238,149,0.95)',
      'rgba(255,217,99,0.95)',
      'rgba(255,175,43,0.95)',
      'rgba(255,135,24,0.95)',
      'rgba(234,10,0,0.95)',
      'rgba(195,0,0,0.95)',
      'rgba(139,0,0,0.95)',
    ];

    new Dot('container', {
      map: {
        type: 'amap',
        style: 'dark',
        center: [102.601, 37.32],
        zoom: 3,
        pitch: 0,
      },
      source: {
        data: data,
        parser: { type: 'geojson' },
      },
      color: {
        field: 'PerCapitaGDP',
        value: ({ PerCapitaGDP }) => {
          const index = Math.min(7, ~~(PerCapitaGDP / 10000));
          return colors[index];
        },
      },
      size: {
        field: 'population',
        value: ({ population }) => population / 80,
      },
      style: {
        opacity: 1,
        strokeWidth: 0,
      },
      state: { active: { color: '#1EA7FD' } },
      tooltip: {
        items: [
          { field: '名称', alias: '名称' },
          { field: 'PerCapitaGDP', alias: '人均GDP' },
          { field: 'population', alias: '人口' },
        ],
      },
      zoom: {
        position: 'bottomright',
      },
    });
  });
