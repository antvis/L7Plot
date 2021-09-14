import React, { Component } from 'react';
import { Dot } from '@antv/l7plot';

class Basic extends Component {
  public map: Dot | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/antfincdn/xZqmXatMnc/quanguojiaotongshijianxiangyingzhishu.json'
    );
    const data = await response.json();

    const bubbleMap = new Dot('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        center: [102.447303, 37.753574],
        zoom: 2,
        pitch: 0,
      },
      source: {
        data: data,
        parser: {
          type: 'geojson',
        },
      },

      color: '#4cfd47',
      size: 20,

      animate: true,
      state: { active: true },
      autoFit: true,

      label: {
        field: 'cityName',
        style: {
          fill: '#fff',
          fontSize: 12,
          textAnchor: 'top',
          textOffset: [0, 20],
        },
      },
      zoom: {
        position: 'bottomright',
      },
      layerMenu: {
        position: 'topright',
      },
      tooltip: {
        items: [{ field: 'properties.cityName', alias: '名称' }],
      },
    });

    this.map = bubbleMap;
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

export default Basic;
