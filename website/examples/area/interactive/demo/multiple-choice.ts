import { Area } from '@antv/l7plot';

fetch('https://gw.alipayobjects.com/os/basement_prod/1d27c363-af3a-469e-ab5b-7a7e1ce4f311.json')
  .then((response) => response.json())
  .then((data) => {
    new Area('container', {
      map: {
        type: 'amap',
        style: 'blank',
        center: [120.19382669582967, 30.258134],
        zoom: 3,
        pitch: 0,
      },
      source: {
        data: data,
        parser: {
          type: 'geojson',
        },
      },
      autoFit: true,
      color: {
        field: 'unit_price',
        value: [
          '#1A4397',
          '#2555B7',
          '#3165D1',
          '#467BE8',
          '#6296FE',
          '#7EA6F9',
          '#98B7F7',
          '#BDD0F8',
          '#DDE6F7',
          '#F2F5FC',
        ].reverse(),
        scale: { type: 'quantile' },
      },
      style: {
        opacity: 1,
        stroke: '#fff',
        lineWidth: 0.8,
        lineOpacity: 1,
      },
      state: {
        active: true,
        select: {
          stroke: 'yellow',
          lineWidth: 1.5,
          lineOpacity: 0.8,
        },
      },
      enabledMultiSelect: true,
      label: {
        visible: true,
        field: 'name',
        style: {
          fill: 'black',
          opacity: 0.5,
          fontSize: 12,
          spacing: 1,
          padding: [15, 15],
        },
      },
      tooltip: {
        items: ['name', 'code'],
      },
      zoom: {
        position: 'bottomright',
      },
      legend: {
        position: 'bottomleft',
      },
    });
  });
