import { Flow } from '@antv/l7plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/SIybYh6xr1/arc.json')
  .then((response) => response.json())
  .then((data) => {
    new Flow('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        center: [116.3956, 39.9392],
        pitch: 45,
        zoom: 10,
      },
      source: {
        data: data,
        parser: {
          type: 'json',
          x: 'x1',
          y: 'y1',
          x1: 'x',
          y1: 'y',
        },
      },
      autoFit: true,
      shape: 'arc3d',
      size: 1.5,
      color: {
        field: 'count',
        value: ['rgba(1,124,247,0.9)', 'rgba(230,129,28,0.9)'],
        scale: { type: 'quantize' },
      },
      style: {
        opacity: 0.8,
        segmentNumber: 60,
      },
      animate: {
        interval: 2,
        trailLength: 1,
        duration: 2,
      },
      radiation: {
        color: 'white',
        size: 30,
      },
      label: {
        visible: true,
        field: 'count',
        style: {
          fill: '#000',
          opacity: 0.8,
          fontSize: 10,
          stroke: '#fff',
          strokeWidth: 2,
          textAllowOverlap: false,
          padding: [5, 5],
          textOffset: [0, 35],
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
      legend: {
        position: 'bottomleft',
      },
    });
  });
