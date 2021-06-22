import React, { Component } from 'react';
import { ScatterMap } from '@antv/l7plot';

class Density extends Component {
  public map: ScatterMap | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch('https://gw.alipayobjects.com/os/rmsportal/BElVQFEFvpAKzddxFZxJ.txt');
    const data = await response.text();

    const scatterMap = new ScatterMap('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        center: [121.417463, 31.215175],
        pitch: 0,
        zoom: 11,
      },
      source: {
        data: data,
        parser: {
          type: 'csv',
          y: 'lat',
          x: 'lng',
        },
      },

      shape: 'dot',
      color: '#080298',
      size: 0.5,
      style: {
        opacity: 1,
      },
      // popup: {
      //   field: ['name', 'value'],
      //   content: ({ name, value }) => `<span>${name}:</span><span>${value}</span>`,
      //   trigger: 'mousemove',
      // },
      // legend: {
      //   position: 'bottomleft',
      // },
      // scale: {
      //   position: 'bottomright',
      //   maxWidth: 200,
      // },
      // layerMenu: {
      //   position: 'topright',
      // },
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

export default Density;
