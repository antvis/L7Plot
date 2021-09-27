import React, { Component } from 'react';
import { ChinaDistrict } from '@antv/l7plot';

class ChinaMap extends Component {
  public map: ChinaDistrict | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const chinaMap = new ChinaDistrict('container', {
      map: {
        type: 'mapbox',
        style: 'light',
        center: [120.19382669582967, 30.258134],
        zoom: 3,
        pitch: 0,
      },

      source: {
        data: [],
        parser: {
          type: 'json',
        },
      },

      color: {
        field: 'name',
        value: ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'],
      },
      style: {
        opacity: 0.8,
        stroke: '#fff',
        lineType: 'dash',
        lineWidth: 1,
        lineOpacity: 0.5,
      },
      // state: { active: true, select: false },
      // tooltip: {
      //   items: ['properties.name', 'properties.code'],
      // },
      zoom: {
        position: 'bottomright',
      },
      scale: {
        position: 'bottomright',
      },
      layerMenu: {
        position: 'topright',
      },
      // legend: {
      //   position: 'bottomright',
      // },
    });

    this.map = chinaMap;
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

export default ChinaMap;
