import { Dot } from '@antv/l7plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/xZqmXatMnc/quanguojiaotongshijianxiangyingzhishu.json')
  .then((response) => response.json())
  .then((data) => {
    new Dot('container', {
      map: {
        type: 'amap',
        style: 'dark',
        center: [102.447303, 37.753574],
        zoom: 2,
        pitch: 0,
      },
      source: {
        data: data,
        parser: {
          type: 'geojson',
        },
      },
      color: '#4cfd47',
      size: 20,
      animate: true,
      state: { active: true },
      autoFit: true,
      label: {
        field: 'cityName',
        style: {
          fill: '#fff',
          fontSize: 12,
          textAnchor: 'top',
          textOffset: [0, 20],
        },
      },
      zoom: {
        position: 'bottomright',
      },
      layerMenu: {
        position: 'topright',
      },
      tooltip: {
        items: [{ field: 'cityName', alias: '名称' }],
      },
    });
  });
