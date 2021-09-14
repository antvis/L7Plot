import React, { Component } from 'react';
import { DotDensity } from '@antv/l7plot';

class BeijingTraffic extends Component {
  public map: DotDensity | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch('https://gw.alipayobjects.com/os/antfincdn/8Ps2h%24qgmk/traffic_110000.csv');
    const data = await response.text();
    const colors = ['#c57f34', '#cbfddf', '#edea70', '#8cc9f1', '#2c7bb6'];

    const dotDensity = new DotDensity('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        center: [121.417463, 31.215175],
        pitch: 0,
        zoom: 11,
      },
      source: {
        data: data,
        parser: {
          type: 'csv',
          y: 'lat',
          x: 'lng',
        },
      },
      autoFit: true,

      color: {
        field: 'type',
        value: ({ type }) => {
          switch (parseInt(type)) {
            case 3:
              return colors[0];
            case 4:
              return colors[1];
            case 41:
              return colors[2];
            case 5:
              return colors[3];
            default:
              return colors[4];
          }
        },
      },
      size: 0.5,
      style: {
        opacity: 1,
      },
      zoom: {
        position: 'bottomright',
      },
    });

    this.map = dotDensity;
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

export default BeijingTraffic;
