import React, { Component } from 'react';
import { Dot } from '@antv/l7plot';

class Monochrome extends Component {
  public map: Dot | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch('https://gw.alipayobjects.com/os/antfincdn/g5hIthhKlr/quanguoshixianweizhi.json');
    const { list } = await response.json();

    const scatterMap = new Dot('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        zoom: 5,
        center: [107.4976, 32.1697],
        pitch: 0,
      },
      source: {
        data: list,
        parser: {
          type: 'json',
          coordinates: 'lnglat',
        },
      },
      size: 4,
      color: {
        field: 'style',
        value: ({ style }) => {
          if (style == 0) {
            return '#14B4C9';
          } else if (style == 1) {
            return '#3771D9';
          } else {
            return '#B8EFE2';
          }
        },
      },
      style: {
        opacity: 0.8,
        strokeWidth: 0,
      },
      state: { active: { color: '#FFF684' } },
      label: {
        visible: false,
        field: 'name',
        style: {
          fill: '#fff',
          fontSize: 12,
          textAnchor: 'top',
          textOffset: [0, 20],
          padding: [10, 10],
        },
      },
      zoom: {
        position: 'bottomright',
      },
      layerMenu: {
        position: 'topright',
      },
      tooltip: {
        items: ['name'],
      },
      legend: {
        type: 'category',
        position: 'bottomleft',
        items: [
          { color: '#14B4C9', value: '地级市' },
          { color: '#3771D9', value: '县城市' },
          { color: '#B8EFE2', value: '区县' },
        ],
      },
    });

    this.map = scatterMap;
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

export default Monochrome;
