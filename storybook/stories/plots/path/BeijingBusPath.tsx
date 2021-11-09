import React, { useRef, useEffect } from 'react';
import { Path } from '@antv/l7plot';

export default function BeijingBusPath() {
  const map = useRef<Path>();

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/1atwIMvcMo/beijinggongjiaoluxian.json')
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
            parser: {
              type: 'json',
              coordinates: 'lnglat',
            },
          },
          size: 1,
          color: {
            field: 'line_name',
            value: ['#5B8FF9', '#5CCEA1', '#5D7092'],
          },
          style: {
            opacity: 0.8,
          },
          state: { active: { color: '#FFF684' } },
          autoFit: true,
          tooltip: {
            items: ['line_name', 'line_id'],
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
