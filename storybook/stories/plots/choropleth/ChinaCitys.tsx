import React, { Component } from 'react';
import { Choropleth } from '@antv/l7plot';

class ChinaCitys extends Component {
  public map: Choropleth | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch('https://gw.alipayobjects.com/os/bmw-prod/707cd4be-8ffe-4778-b863-3335eefd5fd5.json');
    const data = await response.json();

    const choroplethMap = new Choropleth('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        center: [120.19382669582967, 30.258134],
        zoom: 3,
        pitch: 0,
      },
      source: {
        data: data,
        parser: {
          type: 'geojson',
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
      state: { active: true, select: false },
      tooltip: {
        items: ['properties.name', 'properties.code'],
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
      legend: {
        position: 'bottomright',
      },
    });

    this.map = choroplethMap;
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

export default ChinaCitys;
