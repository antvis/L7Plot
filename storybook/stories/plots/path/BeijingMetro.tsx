import React, { useRef, useEffect } from 'react';
import { Path } from '@antv/l7plot';

export default function BeijingMetro() {
  const map = useRef<Path>();

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/basement_prod/0d2f0113-f48b-4db9-8adc-a3937243d5a3.json')
      .then((response) => response.json())
      .then((data) => {
        const trailMap = new Path('container', {
          theme: 'dark',
          map: {
            type: 'mapbox',
            center: [116.3956, 39.9392],
            pitch: 0,
            zoom: 10,
          },
          source: {
            data: data,
          },
          size: 2,
          color: {
            field: '标准名称',
            value: ['#5B8FF9', '#5CCEA1', '#5D7092'],
          },
          style: {
            opacity: 0.8,
            lineType: 'dash',
          },
          state: { active: { color: '#FFF684' } },
          tooltip: {
            items: ['标准名称', '分类代码'],
          },
          zoom: {
            position: 'bottomright',
          },
          layerMenu: {
            position: 'topright',
          },
        });

        map.current = trailMap;
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
