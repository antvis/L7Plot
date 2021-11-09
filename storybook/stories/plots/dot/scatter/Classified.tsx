import React, { Component } from 'react';
import { Dot } from '@antv/l7plot';

class Classified extends Component {
  public map: Dot | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/basement_prod/6c4bb5f2-850b-419d-afc4-e46032fc9f94.csv'
    );
    const data = await response.text();

    const scatterMap = new Dot('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        center: [-121.24357, 37.58264],
        pitch: 0,
        zoom: 6.45,
      },
      source: {
        data: data,
        parser: {
          type: 'csv',
          x: 'Longitude',
          y: 'Latitude',
        },
      },
      color: {
        field: 'Magnitude',
        value: [
          '#0A3663',
          '#1558AC',
          '#3771D9',
          '#4D89E5',
          '#64A5D3',
          '#72BED6',
          '#83CED6',
          '#A6E1E0',
          '#B8EFE2',
          '#D7F9F0',
        ],
      },
      size: 3,
      style: {
        opacity: 0.8,
        strokeWidth: 0,
      },
      state: { active: { color: '#FFF684' } },
      label: {
        visible: false,
        field: 'Magnitude',
        style: {
          fill: '#fff',
          fontSize: 12,
          textAnchor: 'top',
          textOffset: [0, 20],
          padding: [10, 10],
        },
      },
      tooltip: {
        items: ['Magnitude'],
      },
      zoom: {
        position: 'bottomright',
      },
      layerMenu: {
        position: 'topright',
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

export default Classified;
