import React, { Component } from 'react';
import { registerImages, Dot, SimplePointLayer } from '@antv/l7plot';
import { Scene, GaodeMap } from '@antv/l7';

class SimpleDot extends Component {
  public map: Dot | undefined;

  constructor(props) {
    super(props);
    const images = [
      { id: '01', image: 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg' },
      { id: '02', image: 'https://gw.alipayobjects.com/zos/basement_prod/30580bc9-506f-4438-8c1a-744e082054ec.svg' },
      { id: '03', image: 'https://gw.alipayobjects.com/zos/basement_prod/7aa1f460-9f9f-499f-afdf-13424aa26bbf.svg' },
    ];
    registerImages(images);
  }

  async initMap() {
    const scene = new Scene({
      id: 'container',
      map: new GaodeMap({
        style: 'dark',
        center: [121.409765, 31.256735],
        zoom: 4,
        pitch: 0,
      }),
    });

    const dot = new SimplePointLayer([{ lng: 120, lat: 30 }], {
      size: 10,
      color: '#f00',
      shape: 'circle',
    });

    scene.on('loaded', () => {
      dot.addTo(scene);
    });
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    this.map && this.map.destroy();
  }

  render() {
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
}

export default SimpleDot;
