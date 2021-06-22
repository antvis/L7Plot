import React, { Component } from 'react';
import { Scene, PointLayer, GaodeMap } from '@antv/l7plot/node_modules/@antv/l7';

class Basic extends Component {
  public scene: Scene | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch('https://gw.alipayobjects.com/os/rmsportal/oVTMqfzuuRFKiDwhPSFL.json');
    const data = await response.json();

    const scene = new Scene({
      id: 'container',
      map: new GaodeMap({
        pitch: 0,
        style: 'dark',
        center: [102.447303, 37.753574],
        zoom: 5.32,
        maxZoom: 10,
      }),
    });

    const pointLayer = new PointLayer({})
      .source(data.list, {
        parser: {
          type: 'json',
          x: 'j',
          y: 'w',
        },
      })
      .shape('circle')
      .size('t', [0, 16])
      .color('t', ['#34B6B7', '#4AC5AF', '#5FD3A6', '#7BE39E', '#A1EDB8', '#CEF8D6'])
      .active(true)
      .style({
        opacity: 0.5,
        strokeWidth: 0,
      });

    scene.on('loaded', () => {
      scene.addLayer(pointLayer);
    });

    this.scene = scene;
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    this.scene && this.scene.destroy();
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

export default Basic;
