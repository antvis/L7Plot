import React, { Component } from 'react';
import { BubbleMap } from '@antv/l7plot';

class Basic extends Component {
  public map: BubbleMap | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/basement_prod/9078fd36-ce8d-4ee2-91bc-605db8315fdf.csv'
    );
    const data = await response.text();

    const bubbleMap = new BubbleMap('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        center: [102.447303, 37.753574],
        zoom: 2,
        pitch: 0,
      },
      source: {
        data: data,
        parser: {
          type: 'csv',
          x: 'Longitude',
          y: 'Latitude',
        },
      },

      color: '#4cfd47',
      size: 56,

      animate: true,
      state: { active: true },

      label: {
        field: 'SATCAT Designation',
        style: {
          fill: '#fff',
          fontSize: 12,
          textAnchor: 'top', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
          textOffset: [0, 20], // 文本相对锚点的偏移量 [水平, 垂直]
        },
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

    this.map = bubbleMap;
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

export default Basic;
