import React, { Component } from 'react';
import { HexagonMap } from '@antv/l7plot';

class HexagonDelay extends Component {
  public map: HexagonMap | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch('https://gw.alipayobjects.com/os/antfincdn/Ml2DwikvFC/20210726100731.json');
    const data = await response.json();

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
          type: 'geojson',
        },
        aggregation: {
          radius: 1200,
          field: 'rank',
          type: 'sum',
        },
      },
      autoFit: true,

      shape: 'hexagonColumn',
      size: {
        field: 'sum',
        value: ({ sum }) => {
          return sum * 10;
        },
      },
      color: {
        field: 'sum',
        value: ['#0553A1', '#0B79B0', '#10B3B0', '#7CCF98', '#DCE872'],
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

export default HexagonDelay;
