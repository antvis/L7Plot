import React, { useRef, useEffect } from 'react';
import { Flow } from '@antv/l7plot';

export default function WindField() {
  const map = useRef<Flow>();
  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/7455fead-1dc0-458d-b91a-fb4cf99e701e.txt')
      .then((response) => response.text())
      .then((data) => {
        const connectionMap = new Flow('container', {
          map: {
            type: 'mapbox',
            style: 'dark',
            center: [60, 40.7128],
            zoom: 2,
          },
          source: {
            data: data,
            parser: {
              type: 'csv',
              x: 'lng1',
              y: 'lat1',
              x1: 'lng2',
              y1: 'lat2',
            },
          },
          shape: 'arc',
          size: 0.5,
          color: '#6495ED',
          style: {
            opacity: 0.8,
          },
          animate: {
            duration: 4,
            interval: 0.2,
            trailLength: 0.6,
          },
          zoom: {
            position: 'bottomright',
          },
          scale: {
            position: 'bottomright',
          },
        });

        map.current = connectionMap;
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
