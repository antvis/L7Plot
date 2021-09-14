import React, { Component } from 'react';
import { Grid } from '@antv/l7plot';

class Grid2D extends Component {
  public map: Grid | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch('https://gw.alipayobjects.com/os/antfincdn/aBQAMIpvPL/qingdao_500m.csv');
    const data = await response.text();

    const gridMap = new Grid('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        pitch: 0,
        zoom: 8.6,
        center: [120.198254, 36.265551],
      },
      source: {
        data: data,
        parser: {
          type: 'csv',
          x: 'lng',
          y: 'lat',
        },
        aggregation: {
          radius: 1000,
          field: 'count',
          method: 'sum',
        },
      },

      shape: 'square',
      color: {
        field: 'count',
        value: ['#0868AC', '#43A2CA', '#43A2CA', '#7BCCC4', '#BAE4BC', '#F0F9E8', '#F0F9E8'],
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

export default Grid2D;
