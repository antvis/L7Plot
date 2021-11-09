import { Area } from '@antv/l7plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/707cd4be-8ffe-4778-b863-3335eefd5fd5.json')
  .then((response) => response.json())
  .then((data) => {
    new Area('container', {
      map: {
        type: 'mapbox',
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
        field: 'code',
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
          opacity: 1,
          fill: '#fff',
          strokeWidth: 0,
          padding: [15, 15],
          textAllowOverlap: false,
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
