import { HeatMap } from '@antv/l7plot';

async function initMap() {
  const response = await fetch(
    'https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json'
  );
  const data = await response.json();

  const heatMap = new HeatMap('container', {
    map: {
      type: 'mapbox',
      style: 'dark',
      center: [127.5671666579043, 7.445038892195569],
      zoom: 2.632456779444394,
      pitch: 0,
    },
    source: {
      data: data,
      parser: {
        type: 'geojson',
      },
    },
    size: {
      field: 'mag',
    },

    zoom: {
      position: 'bottomright',
    },
    scale: {
      position: 'bottomright',
    },
  });
}

initMap();
