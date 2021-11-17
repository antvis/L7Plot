import React, { useRef, useEffect } from 'react';
import { L7Plot, registerImage } from '@antv/l7plot';

registerImage('plane', 'https://gw.alipayobjects.com/zos/bmw-prod/0ca1668e-38c2-4010-8568-b57cb33839b9.svg');

function AirFlyFlow() {
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
            color: '#ff6b34',
            size: 1,
            style: {
              lineType: 'dash',
              dashArray: [5, 5],
              opacity: 0.5,
            },
            state: { active: true },
          },
          {
            name: 'airfly',
            type: 'arcLayer',
            source: {
              data: flydata,
              parser: {
                type: 'json',
                coordinates: 'coord',
              },
            },
            color: '#ff6b34',
            size: 20,
            texture: 'plane',
            style: {
              textureBlend: 'replace',
              lineTexture: true, // 开启线的贴图功能
              iconStep: 10, // 设置贴图纹理的间距
              opacity: 1,
            },
            state: { active: true },
            animate: {
              duration: 10,
              interval: 0.2,
              trailLength: 0.05,
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

export default AirFlyFlow;
