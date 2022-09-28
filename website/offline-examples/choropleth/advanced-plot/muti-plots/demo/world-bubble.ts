import { L7Plot } from '@antv/l7plot';

fetch(`https://gw.alipayobjects.com/os/alisis/geo-data-v0.1.2/administrative-data/area-list.json`)
  .then((response) => response.json())
  .then((list) => {
    const data = list
      .filter(({ level }) => level === 'country')
      .map((item) => Object.assign({}, item, { value: Math.random() * 5000 }));

    new L7Plot('container', {
      map: {
        type: 'amap',
        style: 'blank',
        center: [120.19382669582967, 30.258134],
        zoom: 3,
        pitch: 0,
      },
      plots: [
        {
          type: 'choropleth',
          zIndex: 1,
          source: {
            data: [],
            joinBy: {
              sourceField: 'code',
              geoField: 'adcode',
            },
          },
          viewLevel: {
            level: 'world',
            adcode: 'all',
          },
          autoFit: true,
          color: '#ccc',
          style: {
            opacity: 1,
            stroke: '#bdbdbd',
            lineWidth: 0.6,
            lineOpacity: 0.8,
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
              strokeWidth: 2,
              textAllowOverlap: false,
              padding: [5, 5],
              textOffset: [0, 60],
            },
          },
        },
        {
          type: 'dot',
          zIndex: 2,
          source: {
            data: data,
            parser: { type: 'json', x: 'lng', y: 'lat' },
          },
          color: {
            field: 'value',
            value: ['#feedde', '#fdd0a2', '#fdae6b', '#fd8d3c', '#e6550d', '#a63603'],
            scale: { type: 'quantile' },
          },
          size: 15,
          style: {
            opacity: 1,
            stroke: '#fff',
            strokeWidth: 1,
          },
          tooltip: {
            items: ['name', 'value'],
          },
        },
      ],
      layers: [],
      zoom: {
        position: 'bottomright',
      },
    });
  });
