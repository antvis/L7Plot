import { BubbleMap } from '@antv/l7plot';

async function initMap() {
  const response = await fetch(
    'https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json'
  );
  const data = await response.json();

  new BubbleMap('container', {
    map: {
      type: 'mapbox',
      style: 'dark',
      center: [102.447303, 37.753574],
      zoom: 1,
      pitch: 0,
    },
    source: {
      data: data,
      parser: { type: 'geojson' },
    },

    color: {
      field: 'mag',
      value: ({ mag }) => {
        return mag > 4.5 ? '#5B8FF9' : '#5CCEA1';
      },
    },
    size: {
      field: 'mag',
      value: [1, 25],
    },

    style: {
      opacity: 0.3,
      strokeWidth: 1,
    },
    state: { active: true },

    label: {
      visible: true,
      field: 'mag',
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
    tooltip: {
      items: [{ field: 'properties.mag', alias: 'mag' }],
    },
  });
}

initMap();
