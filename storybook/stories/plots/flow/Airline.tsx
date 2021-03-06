import React, { useRef, useEffect } from 'react';
import { Flow } from '@antv/l7plot';

export default function Airline() {
  const map = useRef<Flow>();
  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/AUom1g4loR/openflight_airline_1.json')
      .then((response) => response.json())
      .then((data) => {
        const plot = new Flow('container', {
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
              x: 'fromLng',
              y: 'fromLat',
              x1: 'toLng',
              y1: 'toLat',
            },
          },
          size: 2,
          color: '#ff6b34',
          style: {
            opacity: 0.8,
          },
          animate: {
            interval: 2,
            trailLength: 1,
            duration: 2,
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
