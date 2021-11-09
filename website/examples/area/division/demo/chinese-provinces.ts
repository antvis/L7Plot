import { Area } from '@antv/l7plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/d6da7ac1-8b4f-4a55-93ea-e81aa08f0cf3.json')
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
        field: 'adcode',
        value: ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(107,174,214)', 'rgb(49,130,189)', 'rgb(8,81,156)'],
        scale: { type: 'quantile' },
      },
      style: {
        opacity: 1,
        stroke: 'rgb(93,112,146)',
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
          fill: '#fff',
          opacity: 0.8,
          fontSize: 12,
          textAnchor: 'center', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
          spacing: 1, // 字符间距
          padding: [15, 15], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
          stroke: '#c0c0c0', // 描边颜色
          strokeWidth: 0.5, // 描边宽度
        },
      },
      tooltip: {
        items: ['name', 'adcode'],
      },
      zoom: {
        position: 'bottomright',
      },
      legend: {
        position: 'bottomleft',
      },
    });
  });
