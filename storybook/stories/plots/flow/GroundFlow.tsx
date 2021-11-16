import React, { useRef, useEffect } from 'react';
import { Flow } from '@antv/l7plot';

export default function GroundFlow() {
  const map = useRef<Flow>();
  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/SIybYh6xr1/arc.json')
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
              x: 'x1',
              y: 'y1',
              x1: 'x',
              y1: 'y',
            },
          },
          autoFit: true,
          shape: 'arc',
          size: 2,
          color: {
            field: 'count',
            value: ['rgba(1,124,247,0.9)', 'rgba(230,129,28,0.9)'],
            scale: { type: 'quantize' },
          },
          style: {
            opacity: 0.8,
            // sourceColor: 'red',
            // targetColor: 'blue',
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
            field: 'dis',
            style: {
              fill: '#000',
              opacity: 0.8,
              fontSize: 10,
              stroke: '#fff',
              strokeWidth: 2,
              textAllowOverlap: true,
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
