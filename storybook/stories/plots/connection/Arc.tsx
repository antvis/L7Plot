import React, { useRef, useEffect } from 'react';
import { Connection } from '@antv/l7plot';

export default function Arc() {
  const map = useRef<Connection>();
  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/%26%26hmITfpCp/home_comp_line.json')
      .then((response) => response.json())
      .then((data) => {
        const connectionMap = new Connection('container', {
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
              x: 'fromLat',
              y: 'fromLng',
              x1: 'toLat',
              y1: 'toLng',
            },
          },
          shape: 'arc3d',
          size: 1.5,
          color: '#1CD5FF',
          style: {
            opacity: 0.8,
          },
          autoFit: true,
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
