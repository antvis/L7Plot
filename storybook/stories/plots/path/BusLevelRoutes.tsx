import React, { useRef, useEffect } from 'react';
import { Path } from '@antv/l7plot';

export default function BusRoutes() {
  const map = useRef<Path>();

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/basement_prod/ee07641d-5490-4768-9826-25862e8019e1.json')
      .then((response) => response.json())
      .then((data) => {
        const pathMap = new Path('container', {
          theme: 'dark',
          map: {
            type: 'mapbox',
            center: [116.3956, 39.9392],
            pitch: 45,
            zoom: 10,
          },
          source: {
            data: data,
            parser: {
              type: 'json',
              coordinates: 'path',
            },
          },
          size: {
            field: 'level',
            value: ({ level }) => {
              return [0.8, level * 1000];
            },
          },
          color: {
            field: 'number',
            value: ['#5B8FF9', '#5CCEA1', '#5D7092'],
          },
          style: {
            opacity: 0.8,
          },
          autoFit: true,
          state: { active: { color: '#FFF684' } },
          tooltip: {
            items: ['level', 'number'],
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
        });

        map.current = pathMap;
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
