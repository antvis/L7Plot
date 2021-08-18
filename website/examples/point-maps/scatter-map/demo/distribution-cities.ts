import { ScatterMap } from '@antv/l7plot';

async function initMap() {
  const response = await fetch('https://gw.alipayobjects.com/os/antfincdn/g5hIthhKlr/quanguoshixianweizhi.json');
  const { list } = await response.json();

  new ScatterMap('container', {
    map: {
      type: 'mapbox',
      style: 'dark',
      zoom: 5,
      center: [107.4976, 32.1697],
      pitch: 0,
    },
    source: {
      data: list,
      parser: {
        type: 'json',
        coordinates: 'lnglat',
      },
    },
    color: '#14B4C9',
    size: 2,

    style: {
      opacity: 0.8,
      strokeWidth: 0,
    },

    label: {
      visible: false,
      field: 'name',
      style: {
        fill: '#fff',
        fontSize: 12,
        textAnchor: 'top',
        textOffset: [0, 20],
        padding: [10, 10],
      },
    },
    zoom: {
      position: 'bottomright',
    },
    layerMenu: {
      position: 'topright',
    },
  });
}

initMap();
