import { BubbleMap } from '@antv/l7plot';

async function initMap() {
  const response = await fetch(
    'https://gw.alipayobjects.com/os/basement_prod/9078fd36-ce8d-4ee2-91bc-605db8315fdf.csv'
  );
  const data = await response.text();

  const bubbleMap = new BubbleMap('container', {
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
        type: 'csv',
        x: 'Longitude',
        y: 'Latitude',
      },
    },

    color: '#4cfd47',
    size: 56,

    animate: true,
    state: { active: true },

    label: {
      field: 'SATCAT Designation',
      style: {
        fill: '#fff',
        fontSize: 12,
        textAnchor: 'top', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
        textOffset: [0, 20], // 文本相对锚点的偏移量 [水平, 垂直]
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
      items: ['FullName', 'SATCAT Designation'],
    },
  });
}

initMap();
