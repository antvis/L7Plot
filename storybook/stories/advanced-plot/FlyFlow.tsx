import React, { useRef, useEffect } from 'react';
import { L7Plot } from '@antv/l7plot';

function FlyFlow() {
  const map = useRef<L7Plot>();

  useEffect(() => {
    Promise.all([
      fetch('https://gw.alipayobjects.com/os/basement_prod/dbd008f1-9189-461c-88aa-569357ffc07d.json').then((data) =>
        data.json()
      ),
      fetch('https://gw.alipayobjects.com/os/antfincdn/i%26CI%24gcnA8/dot.json').then((data) => data.json()),
      fetch('https://gw.alipayobjects.com/os/antfincdn/iP4LUS9o0t/flyline.json').then((data) => data.json()),
    ]).then(([world, dotData, flydata]) => {
      const plot = new L7Plot('container', {
        map: {
          type: 'mapbox',
          style: 'dark',
          pitch: 35,
          center: [3.438, 40.16797],
          zoom: 0.51329,
        },
        layers: [
          {
            name: 'worldLine',
            type: 'pathLayer',
            source: {
              data: world,
            },
            color: '#41fc9d',
            size: 0.5,
            style: {
              opacity: 0.4,
            },
          },
          {
            name: 'dotPoint',
            type: 'dotLayer',
            source: {
              data: dotData,
              parser: {
                type: 'json',
                x: 'lng',
                y: 'lat',
              },
            },
            color: '#ffed11',
            size: 40,
            style: {
              opacity: 1,
            },
            animate: {
              speed: 0.8,
            },
          },
          {
            name: 'flyLine',
            type: 'arcLayer',
            source: {
              data: flydata,
              parser: {
                type: 'json',
                coordinates: 'coord',
              },
            },
            shape: 'arc3d',
            color: '#ff6b34',
            size: 2,
            style: {
              opacity: 1,
            },
            state: { active: true },
            animate: {
              interval: 2,
              trailLength: 2,
              duration: 1,
            },
          },
        ],
        zoom: {
          position: 'bottomright',
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

export default FlyFlow;
