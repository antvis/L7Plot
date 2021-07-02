import React, { Component } from 'react';
import { HeatMap } from '@antv/l7plot';

class Grid extends Component {
  public map: HeatMap | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/basement_prod/7359a5e9-3c5e-453f-b207-bc892fb23b84.csv'
    );
    const data = await response.text();

    const heatMap = new HeatMap('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        pitch: 0,
        center: [107.054293, 35.246265],
        zoom: 5,
      },
      source: {
        data: data,
        parser: {
          type: 'csv',
          x: 'lng',
          y: 'lat',
        },
        transforms: [
          {
            type: 'grid',
            size: 20000,
            field: 'v',
            method: 'sum',
          },
        ],

        shape: 'square',
        color: {
          field: 'count',
          value: [
            '#0B0030',
            '#100243',
            '#100243',
            '#1B048B',
            '#051FB7',
            '#0350C1',
            '#0350C1',
            '#0072C4',
            '#0796D3',
            '#2BA9DF',
            '#30C7C4',
            '#6BD5A0',
            '#A7ECB2',
            '#D0F4CA',
          ],
        },
        style: {
          coverage: 1,
          angle: 0,
        },
      },
    });

    this.map = heatMap;
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

export default Grid;
