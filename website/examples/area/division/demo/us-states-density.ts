import { Area } from '@antv/l7plot';

fetch('https://gw.alipayobjects.com/os/basement_prod/d36ad90e-3902-4742-b8a2-d93f7e5dafa2.json')
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
        field: 'density',
        value: ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'],
        scale: { type: 'quantile' },
      },
      style: {
        opacity: 1,
        stroke: '#fff',
        lineWidth: 0.6,
        lineOpacity: 1,
      },
      state: {
        active: true,
      },
      label: {
        visible: true,
        field: 'name',
        style: {
          fill: '#000',
          opacity: 0.8,
          fontSize: 10,
          stroke: '#fff',
          strokeWidth: 1.5,
          textAllowOverlap: false,
          padding: [8, 8],
        },
      },
      tooltip: {
        items: ['name', 'density'],
      },
      zoom: {
        position: 'bottomright',
      },
      legend: {
        position: 'bottomleft',
      },
    });
  });
