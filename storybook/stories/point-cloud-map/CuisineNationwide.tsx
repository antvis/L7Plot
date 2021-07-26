import React, { Component } from 'react';
import { PointCloudMap } from '@antv/l7plot';

class CuisineNationwide extends Component {
  public map: PointCloudMap | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/antfincdn/fZreT5RyVT/6wanquanguoyuecaidefenbu.geojson'
    );
    const data = await response.json();

    const pointCloud = new PointCloudMap('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        center: [105.425968, 35.882505],
        pitch: 0,
        zoom: 11,
      },
      source: {
        data: data,
        parser: {
          type: 'geojson',
        },
      },
      autoFit: true,

      color: '#3C1FA8',
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

export default CuisineNationwide;
