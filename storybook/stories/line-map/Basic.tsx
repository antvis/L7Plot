import React, { useRef, useEffect } from 'react';
import { LineMap, Source } from '@antv/l7plot';

export function Basic() {
  const map = useRef<LineMap>();

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        'https://gw.alipayobjects.com/os/basement_prod/0d2f0113-f48b-4db9-8adc-a3937243d5a3.json'
      );
      const source = await response.json();
      map.current = new LineMap('container', {
        map: {
          center: [116.3956, 39.9392],
          pitch: 0,
          zoom: 10,
          rotation: 0,
        },
        theme: 'dark',
        source: {
          data: source,
        },
        // shape: 'line',
        size: () => 1.5,
        color: {
          field: '标准名称',
          value: ['#5B8FF9', '#5CCEA1', '#5D7092'],
        },
        // animate: true,
      });
    }

    getData();

    return () => map.current?.destroy();
  }, []);

  return (
    <>
      <div
        onClick={() => {
          map.current?.update({
            size: 2,
            color: 'red',
            animate: false,
          });
        }}
        style={{ color: 'red', fontSize: 40, display: 'inline-block' }}
      >
        update
      </div>
      <div
        onClick={() => {
          map.current?.update({
            source: {
              data: {
                type: 'FeatureCollection',
                features: [
                  {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                      type: 'LineString',
                      coordinates: [
                        [116.38050072430798, 39.94888011518406],
                        [136.40625, 61.77312286453146],
                      ],
                    },
                  },
                ],
              },
            },
            color: 'red',
            shape: 'arc',
            animate: false,
          });
        }}
        style={{ color: 'red', fontSize: 40, display: 'inline-block' }}
      >
        arc
      </div>
      <div
        id="container"
        style={{
          position: 'absolute',
          top: 80,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    </>
  );
}
