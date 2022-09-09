import { Heatmap } from '@antv/l7plot';

fetch('https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json')
  .then((response) => response.json())
  .then((data) => {
    new Heatmap('container', {
      map: {
        type: 'amap',
        style: 'dark',
        center: [127.5671666579043, 7.445038892195569],
        zoom: 2.632456779444394,
        pitch: 45,
      },
      source: {
        data: data,
        parser: {
          type: 'geojson',
        },
      },
      shape: 'heatmap3D',
      size: {
        field: 'mag',
      },
      legend: {
        position: 'bottomleft',
      },
    });
  });
