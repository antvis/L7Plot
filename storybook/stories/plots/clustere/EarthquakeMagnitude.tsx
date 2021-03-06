import React, { Component } from 'react';
import { Dot } from '@antv/l7plot';

class EarthquakeMagnitude extends Component {
  public map: Dot | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json'
    );
    const data = await response.json();

    const clustereMap = new Dot('container', {
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
        cluster: true,
        clusterOptions: {
          radius: 40,
          minZoom: 0,
          maxZoom: 20,
        },
      },

      color: '#5FD3A6',
      size: {
        field: 'point_count',
        value: [10, 20, 30, 40, 50, 60, 70, 80],
        scale: { type: 'quantile' },
      },

      style: {
        opacity: 0.5,
        strokeWidth: 1,
      },
      state: { active: true },

      label: {
        visible: true,
        field: 'point_count',
        style: {
          fill: '#fff',
          fontSize: 12,
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
    });

    this.map = clustereMap;
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

export default EarthquakeMagnitude;
