import { BubbleMap } from '@antv/l7plot';

async function initMap() {
  const response = await fetch(
    'https://gw.alipayobjects.com/os/antfincdn/xZqmXatMnc/quanguojiaotongshijianxiangyingzhishu.json'
  );
  const data = await response.json();

  new BubbleMap('container', {
    map: {
      type: 'mapbox',
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
      items: [{ field: 'properties.cityName', alias: '名称' }],
    },
  });
}

initMap();
