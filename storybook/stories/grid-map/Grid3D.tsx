import React, { Component } from 'react';
import { GridMap } from '@antv/l7plot';

class Grid3D extends Component {
  public map: GridMap | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/basement_prod/7359a5e9-3c5e-453f-b207-bc892fb23b84.csv'
    );
    const data = await response.text();

    const gridMap = new GridMap('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        pitch: 45,
        center: [109.054293, 29.246265],
        zoom: 5,
      },
      source: {
        data: data,
        parser: {
          type: 'csv',
          x: 'lng',
          y: 'lat',
        },
        aggregation: {
          radius: 20000,
          field: 'v',
          type: 'sum',
        },
      },

      shape: 'squareColumn',
      size: {
        field: 'count',
        value: ({ count }) => {
          return count * 200;
        },
      },
      color: {
        field: 'count',
        value: [
          '#8C1EB2',
          '#8C1EB2',
          '#DA05AA',
          '#F0051A',
          '#FF2A3C',
          '#FF4818',
          '#FF4818',
          '#FF8B18',
          '#F77B00',
          '#ED9909',
          '#ECC357',
          '#EDE59C',
        ].reverse(),
      },
      style: {
        coverage: 0.9,
        angle: 0,
      },
    });

    this.map = gridMap;
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

export default Grid3D;
