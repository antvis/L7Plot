import React, { useEffect, useRef } from 'react';
import { L7Plot } from '@antv/l7plot';

function MutiPlot() {
  const map = useRef<L7Plot>();

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/basement_prod/6c4bb5f2-850b-419d-afc4-e46032fc9f94.csv')
      .then((response) => response.text())
      .then((data) => {
        const plot = new L7Plot('container', {
          map: {
            type: 'mapbox',
            style: 'dark',
            center: [-121.24357, 37.58264],
            pitch: 0,
            zoom: 6.45,
          },
          plots: [],
          layers: [],
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

export default MutiPlot;
