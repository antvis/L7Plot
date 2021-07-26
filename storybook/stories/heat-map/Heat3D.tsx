import React, { Component } from 'react';
import { HeatMap } from '@antv/l7plot';

class Heat3D extends Component {
  public map: HeatMap | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch('https://gw.alipayobjects.com/os/antfincdn/OOSGL1vhp3/20200726024229.json');
    const data = await response.json();

    const heatMap = new HeatMap('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        center: [127.5671666579043, 7.445038892195569],
        zoom: 3,
        pitch: 45,
      },
      source: {
        data: data,
        parser: {
          type: 'geojson',
        },
      },
      autoFit: true,
      shape: 'heatmap3D',
      size: {
        field: 'avg',
        value: ({ avg }) => avg / 100,
      },
    });

    this.map = heatMap;
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

export default Heat3D;
