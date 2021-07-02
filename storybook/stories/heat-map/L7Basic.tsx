import React, { Component } from 'react';
import { Scene, HeatmapLayer, GaodeMap } from '@antv/l7';

class Basic extends Component {
  public scene: Scene | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json'
    );
    const data = await response.json();

    const scene = new Scene({
      id: 'container',
      map: new GaodeMap({
        pitch: 0,
        style: 'dark',
        center: [127.5671666579043, 7.445038892195569],
        zoom: 2.632456779444394,
      }),
    });

    const heatmapLayer = new HeatmapLayer({})
      .source(data)
      .shape('heatmap')
      .size('mag', [0, 1.0])
      .style({
        intensity: 2,
        radius: 20,
        opacity: 1.0,
        rampColors: {
          colors: ['#FF4818', '#F7B74A', '#FFF598', '#91EABC', '#2EA9A1', '#206C7C'].reverse(),
          positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
        },
      });

    scene.on('loaded', () => {
      scene.addLayer(heatmapLayer);
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
