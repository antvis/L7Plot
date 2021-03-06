import React, { Component } from 'react';
import { Dot } from '@antv/l7plot';

class CityLocation extends Component {
  public map: Dot | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch('https://gw.alipayobjects.com/os/antfincdn/g5hIthhKlr/quanguoshixianweizhi.json');
    const { list } = await response.json();

    const bubbleMap = new Dot('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        zoom: 5,
        center: [107.4976, 32.1697],
        pitch: 45,
      },
      source: {
        data: list,
        parser: {
          type: 'json',
          coordinates: 'lnglat',
        },
      },
      color: '#47aff7',
      size: {
        field: 'style',
        value: ({ style }) => {
          if (style == 0) {
            return 8;
          } else if (style == 1) {
            return 4;
          } else {
            return 2;
          }
        },
      },
      style: {
        opacity: 0.8,
        stroke: '#c3faff',
        strokeWidth: 1,
      },
      state: { active: { color: '#FFF684' } },
      zoom: {
        position: 'bottomright',
      },
      tooltip: {
        items: ['name'],
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

export default CityLocation;
