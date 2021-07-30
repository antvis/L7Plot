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
        size: () => 1.5,
        color: {
          field: '标准名称',
          value: ['#5B8FF9', '#5CCEA1', '#5D7092'],
        },
        animate: true,
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
            color: 'red',
            animate: false,
          });
        }}
        style={{ color: 'red', fontSize: 40, zIndex: 1000 }}
      >
        update
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
