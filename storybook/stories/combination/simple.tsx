import React, { useEffect } from 'react';
import { GaodeMap, ILayer, Scene } from '@antv/l7';

import { Icon } from '@antv/l7plot-combination';

function Simple() {
  useEffect(() => {
    const scene = new Scene({
      id: 'container',
      map: new GaodeMap({
        center: [121.107846, 30.267069],
        pitch: 0,
        style: 'dark',
        zoom: 5,
      }),
    });
    const url = 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg';
    const url2 = 'https://gw.alipayobjects.com/zos/basement_prod/7aa1f460-9f9f-499f-afdf-13424aa26bbf.svg';

    Icon.clearIconCache();
    Icon.addIconURL(scene, 'n1', url);
    Icon.addIconURL(scene, 'n2', url2);

    // const icon0 = new Icon(
    //   [
    //     {
    //       lng: 120, lat: 32.5, url
    //     },
    //     {
    //       lng: 121.107846, lat: 32.5, url: 'n1'
    //     }
    //   ],
    //   { scene, size: 10 }
    // )

    const icon = new Icon({ lng: 121.107846, lat: 30.5, url: 'n1' }, { scene, size: 10 });

    scene.on('loaded', () => {
      scene.addLayer(icon.getlayer() as ILayer);
      // scene.addLayer(icon0.getlayer() as ILayer)
    });

    setTimeout(() => {
      icon.updateData({ lng: 118, lat: 30.5, url: 'n2' });
    }, 2000);

    console.log('get size', icon.size);
    setTimeout(() => {
      icon.size = 30;
    }, 3000);
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

export default Simple;
