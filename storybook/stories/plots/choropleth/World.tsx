import React, { Component } from 'react';
import { Choropleth } from '@antv/l7plot';

class World extends Component {
  public map: Choropleth | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const chinaMap = new Choropleth('container', {
      map: {
        type: 'amap',
        style: 'blank',
        center: [120.19382669582967, 30.258134],
        zoom: 3,
        pitch: 0,
      },

      source: {
        data: [],
        joinBy: {
          sourceField: 'code',
          geoField: 'adcode',
        },
      },

      viewLevel: {
        level: 'world',
        adcode: 'all',
      },
      autoFit: true,

      color: {
        field: 'name',
        value: ['#feedde', '#fdd0a2', '#fdae6b', '#fd8d3c', '#e6550d', '#a63603'],
      },
      style: {
        opacity: 1,
        stroke: '#ccc',
        lineWidth: 0.6,
        lineOpacity: 1,
      },
      label: {
        visible: true,
        field: 'name',
        style: {
          fill: '#000',
          opacity: 0.8,
          fontSize: 10,
          stroke: '#fff',
          strokeWidth: 2,
          textAllowOverlap: true,
          padding: [5, 5],
        },
      },
      // state: { active: true, select: false },
      tooltip: {
        items: ['name', 'adcode', 'value'],
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
        position: 'bottomleft',
      },
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

export default World;
