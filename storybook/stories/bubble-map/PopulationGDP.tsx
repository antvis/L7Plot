import React, { Component } from 'react';
import { BubbleMap } from '@antv/l7plot';

class PopulationGDP extends Component {
  public map: BubbleMap | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/antfincdn/UvXSmhbwQx/zhongguochengshirenkoushuliangjiGDPpaihang.json'
    );
    const data = await response.json();
    const colors = [
      'rgba(254,255,198,0.95)',
      'rgba(255,238,149,0.95)',
      'rgba(255,217,99,0.95)',
      'rgba(255,175,43,0.95)',
      'rgba(255,135,24,0.95)',
      'rgba(234,10,0,0.95)',
      'rgba(195,0,0,0.95)',
      'rgba(139,0,0,0.95)',
    ];

    const bubbleMap = new BubbleMap('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        center: [102.601, 37.32],
        zoom: 3,
        pitch: 0,
      },
      source: {
        data: data,
        parser: { type: 'geojson' },
      },

      color: {
        field: 'PerCapitaGDP',
        value: ({ PerCapitaGDP }) => {
          const index = Math.min(7, ~~(PerCapitaGDP / 10000));
          return colors[index];
        },
      },
      size: {
        field: 'population',
        value: ({ population }) => population / 80,
      },

      style: {
        opacity: 1,
        strokeWidth: 0,
      },
      state: { active: { color: '#1EA7FD' } },
      zoom: {
        position: 'bottomright',
      },
      tooltip: {
        items: [
          { field: 'properties.名称', alias: '名称' },
          { field: 'properties.PerCapitaGDP', alias: '人均GDP' },
          { field: 'properties.population', alias: '人口' },
        ],
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

export default PopulationGDP;
