import React, { useRef, useEffect } from 'react';
import { Path } from '@antv/l7plot';

export default function Trail() {
  const map = useRef<Path>();
  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/RBklE4pHH3/trail.json')
      .then((response) => response.json())
      .then((data) => {
        const pathMap = new Path('container', {
          theme: 'dark',
          map: {
            type: 'mapbox',
            center: [116.3956, 39.9392],
            pitch: 0,
            zoom: 10,
          },
          source: {
            data: data,
            parser: {
              type: 'json',
              coordinates: 'path',
            },
          },
          size: 1.5,
          color: '#1CD5FF',
          style: {
            opacity: 0.8,
          },
          animate: {
            interval: 0.6, // 间隔
            trailLength: 2, // 流线长度
            duration: 2, // 持续时间，延时
          },
          state: { active: { color: '#FFF684' } },
          autoFit: true,
          zoom: {
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
