import React, { useEffect, useRef } from 'react';
import { L7Plot } from '@antv/l7plot';

function ChinaBubbleMap() {
  const map = useRef<L7Plot>();

  useEffect(() => {
    fetch(`https://gw.alipayobjects.com/os/alisis/geo-data-v0.1.1/administrative-data/area-list.json`)
      .then((response) => response.json())
      .then((list) => {
        const data = list
          .filter(({ level }) => level === 'province')
          .map((item) => Object.assign({}, item, { value: Math.random() * 5000 }));

        const plot = new L7Plot('container', {
          map: {
            type: 'mapbox',
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
                level: 'country',
                adcode: '100000',
              },
              autoFit: true,
              color: '#ccc',
              style: {
                opacity: 1,
                stroke: '#F2F7F7',
                lineWidth: 0.6,
                lineOpacity: 0.8,
              },
              label: {
                visible: true,
                field: 'name',
                style: {
                  fill: '#000',
                  opacity: 0.8,
                  fontSize: 10,
                  stroke: '#f0f0f0',
                  strokeWidth: 2,
                  textAllowOverlap: false,
                  padding: [5, 5],
                  textOffset: [0, 40],
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
              color: '#1AA9FF',
              size: {
                field: 'value',
                value: ({ value }) => value / 200,
              },
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

        map.current = plot;
      });

    return () => map.current?.destroy();
  }, []);

  return (
    <div
      id="container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    ></div>
  );
}

export default ChinaBubbleMap;
