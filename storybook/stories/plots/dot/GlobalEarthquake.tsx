import React, { Component } from 'react';
import { Dot } from '@antv/l7plot';

class GlobalEarthquake extends Component {
  public map: Dot | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch('https://gw.alipayobjects.com/os/antfincdn/uvnCDHPafR/quanqiudizhenshuju.json');
    const data = await response.json();
    const depthColors = ['#D60352', '#F86615', '#F86615', '#F86615', '#F86615'];

    const bubbleMap = new Dot('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        center: [18.159446, 6.547895],
        zoom: 2,
        pitch: 0,
      },
      source: {
        data: data,
        parser: { type: 'geojson' },
      },

      color: {
        field: 'depth',
        value: ({ depth }) => {
          const index = ~~((depth / 120) * depthColors.length) % depthColors.length;
          return depthColors[index];
        },
      },
      size: {
        field: 'level',
        value: ({ level }) => {
          if (level < 7) {
            return level / 2;
          }
          return level;
        },
      },

      style: {
        opacity: 0.8,
        strokeWidth: 0,
      },
      state: { active: true },

      label: {
        visible: false,
        field: 'level',
        style: {
          fill: '#fff',
          fontSize: 12,
          textAnchor: 'center',
          padding: [10, 10],
        },
      },
      zoom: {
        position: 'bottomright',
      },
      scale: {
        position: 'bottomright',
      },
      layerMenu: {
        position: 'topright',
      },
      tooltip: {
        items: [
          { field: 'addr', alias: 'addr' },
          { field: 'level', alias: 'level' },
          { field: 'depth', alias: 'depth' },
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

export default GlobalEarthquake;
