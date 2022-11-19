import { Choropleth } from '@antv/l7plot';

new Choropleth('container', {
  map: {
    type: 'amap',
    style: 'blank',
    center: [120.19382669582967, 30.258134],
    zoom: 3,
    pitch: 0,
  },
  source: {
    data: [
      { name: '中华人民共和国', value: 200 },
      { name: '美国', value: 250 },
      { name: '俄罗斯', value: 180 },
      { name: '日本', value: 120 },
      { name: '加拿大', value: 130 },
      { name: '澳大利亚', value: 130 },
      { name: '新加坡', value: 170 },
      { name: '巴西', value: 80 },
    ],
    joinBy: {
      sourceField: 'name',
      geoField: 'name',
    },
  },
  viewLevel: {
    level: 'world',
    adcode: 'all',
  },
  autoFit: true,
  color: {
    field: 'value',
    value: ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70'],
    scale: { type: 'quantize' },
  },
  style: {
    opacity: 1,
    stroke: '#ccc',
    lineWidth: 0.6,
    lineOpacity: 1,
  },
  chinaBorder: true,
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
      padding: [5, 5],
    },
  },
  state: {
    active: true,
    select: {
      stroke: 'black',
      lineWidth: 1.5,
      lineOpacity: 0.8,
    },
  },
  tooltip: {
    items: ['name', 'adcode', 'value'],
  },
  zoom: {
    position: 'bottomright',
  },
  legend: {
    position: 'bottomleft',
  },
});
