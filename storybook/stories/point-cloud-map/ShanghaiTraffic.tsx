import React, { Component } from 'react';
import { PointCloudMap } from '@antv/l7plot';

class ShanghaiTraffic extends Component {
  public map: PointCloudMap | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch('https://gw.alipayobjects.com/os/rmsportal/BElVQFEFvpAKzddxFZxJ.txt');
    const data = await response.text();

    const pointCloud = new PointCloudMap('container', {
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

      color: '#080298',
      size: 0.5,
      style: {
        opacity: 1,
      },
      zoom: {
        position: 'bottomright',
      },
    });

    this.map = pointCloud;
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

export default ShanghaiTraffic;
