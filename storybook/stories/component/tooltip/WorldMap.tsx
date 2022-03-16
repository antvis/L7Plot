import React, { useEffect, useRef } from 'react';
import { Choropleth } from '@antv/l7plot';
import ReactDOM from 'react-dom';

function WorldMap() {
  const map = useRef<Choropleth>();

  useEffect(() => {
    fetch(`https://gw.alipayobjects.com/os/alisis/geo-data-v0.1.2/administrative-data/area-list.json`)
      .then((response) => response.json())
      .then((list) => {
        const data = list
          .filter(({ level }) => level === 'country')
          .map((item) => Object.assign({}, item, { value: Math.random() * 5000 }));

        const plot = new Choropleth('container', {
          map: {
            type: 'amap',
            style: 'blank',
            center: [120.19382669582967, 30.258134],
            zoom: 3,
            pitch: 0,
          },
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
          color: {
            field: 'name',
            value: ['#feedde', '#fdd0a2', '#fdae6b', '#fd8d3c', '#e6550d', '#a63603'],
          },
          style: {
            opacity: 1,
            stroke: '#ccc',
            lineWidth: 0.6,
            lineOpacity: 1,
          },
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
            customContent: (title, items) => {
              const container = document.createElement('div');
              const portal = ReactDOM.createPortal(
                <div style={{ color: 'red', backgroundColor: '#c0c0c0', padding: '10px' }}>
                  {JSON.stringify(items)}
                </div>,
                container
              );
              ReactDOM.render(portal, container);
              return container;
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

export default WorldMap;
