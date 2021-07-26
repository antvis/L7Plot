import React, { Component } from 'react';
import { HexagonMap } from '@antv/l7plot';

class Hexagon3D extends Component {
  public map: HexagonMap | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/basement_prod/a1a8158d-6fe3-424b-8e50-694ccf61c4d7.csv'
    );
    const data = await response.text();

    const hexagonMap = new HexagonMap('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        pitch: 43,
        center: [120.13383079335335, 29.9],
        zoom: 8.2,
      },
      source: {
        data: data,
        parser: {
          type: 'csv',
          x: 'lng',
          y: 'lat',
        },
        aggregation: {
          radius: 2500,
          field: 'v',
          type: 'sum',
        },
      },

      shape: 'hexagonColumn',
      size: {
        field: 'sum',
        value: ({ sum }) => {
          return sum * 200;
        },
      },
      color: {
        field: 'sum',
        value: [
          '#094D4A',
          '#146968',
          '#1D7F7E',
          '#289899',
          '#34B6B7',
          '#4AC5AF',
          '#5FD3A6',
          '#7BE39E',
          '#A1EDB8',
          '#C3F9CC',
          '#DEFAC0',
          '#ECFFB1',
        ],
      },
      style: {
        coverage: 0.8,
        angle: 0,
        opacity: 1.0,
      },
    });

    this.map = hexagonMap;
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

export default Hexagon3D;
