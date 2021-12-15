import React, { Component } from 'react';
import { SimpleIconPoint } from '@antv/l7plot';
import { Scene, GaodeMap } from '@antv/l7';

class SimpleIconDot extends Component {
  public scene: any;
  constructor(props) {
    super(props);
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

    scene.addImage('01', 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg');
    scene.addImage('02', 'https://gw.alipayobjects.com/zos/basement_prod/30580bc9-506f-4438-8c1a-744e082054ec.svg');
    scene.addImage('03', 'https://gw.alipayobjects.com/zos/basement_prod/7aa1f460-9f9f-499f-afdf-13424aa26bbf.svg');

    this.scene = scene;
    const dotData = [
      { lng: 120, lat: 30, val: 1 },
      { lng: 120, lat: 32, val: 2 },
      { lng: 120, lat: 34, val: 3 },
    ];
    const dot = new SimpleIconPoint(dotData, {
      shape: '01',
      size: {
        field: 'val',
        value: [10, 30],
      },
    });

    scene.on('loaded', () => {
      dot.addTo(scene);
      // d.addTo(scene)
      dot.color = '#f00';
      console.log(dot.color);
    });
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    this.scene.destroy();
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

export default SimpleIconDot;
