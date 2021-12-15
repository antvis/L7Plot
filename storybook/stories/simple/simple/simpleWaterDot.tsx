import React, { Component } from 'react';
import { SimpleWaterPoint } from '@antv/l7plot';
import { Scene, GaodeMap } from '@antv/l7';

class SimpleWaterDot extends Component {
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
    this.scene = scene;
    const dotData = [
      { lng: 120, lat: 30, val: 1 },
      { lng: 120, lat: 32, val: 2 },
      { lng: 120, lat: 34, val: 3 },
    ];
    const dot = new SimpleWaterPoint(dotData, {
      size: {
        field: 'val',
        value: [10, 30],
      },
    });

    scene.on('loaded', () => {
      dot.addTo(scene);
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

export default SimpleWaterDot;
