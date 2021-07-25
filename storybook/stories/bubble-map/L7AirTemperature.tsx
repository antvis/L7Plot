import React, { Component } from 'react';
import { Scene, PointLayer, GaodeMap } from '@antv/l7';

class L7AirTemperature extends Component {
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
      .size('t', [2, 18])
      .color(
        't',
        [
          '#03071e',
          '#370617',
          '#6a040f',
          '#9d0208',
          '#d00000',
          '#dc2f02',
          '#e85d04',
          '#f48c06',
          '#faa307',
          '#ffba08',
        ].reverse()
      )
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

export default L7AirTemperature;
