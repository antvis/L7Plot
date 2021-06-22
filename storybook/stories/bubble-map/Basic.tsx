import React, { Component } from 'react';
import { BubbleMap } from '@antv/l7plot';

class Basic extends Component {
  public map: BubbleMap | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch('https://gw.alipayobjects.com/os/rmsportal/oVTMqfzuuRFKiDwhPSFL.json');
    const data = await response.json();

    const bubbleMap = new BubbleMap('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        center: [102.447303, 37.753574],
        zoom: 5,
        pitch: 0,
      },
      source: {
        data: data.list,
        parser: {
          type: 'json',
          x: 'j',
          y: 'w',
        },
      },

      color: {
        field: 't',
        value: ['#34B6B7', '#4AC5AF', '#5FD3A6', '#7BE39E', '#A1EDB8', '#CEF8D6'],
      },
      size: {
        field: 't',
        value: [0, 20],
      },

      style: {
        opacity: 0.5,
        strokeWidth: 0,
      },
      state: { active: { color: 'red' } },

      label: {
        visible: true,
        field: 't',
        style: {
          fill: '#fff',
          opacity: 0.6,
          fontSize: 12,
          textAnchor: 'top', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
          textOffset: [0, 20], // 文本相对锚点的偏移量 [水平, 垂直]
          spacing: 1, // 字符间距
          padding: [5, 5], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
          stroke: '#ffffff', // 描边颜色
          strokeWidth: 0.3, // 描边宽度
          strokeOpacity: 1.0,
        },
        state: {
          active: { color: 'red' },
          select: { color: '#1AA4D6' },
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

    console.log('bubbleMap: ', bubbleMap);
    const { labelLayer, bobbleLayer } = bubbleMap;
    console.log('bobbleLayer: ', bobbleLayer);
    console.log('labelLayer: ', labelLayer);
    // console.log('scene: ', bubbleMap.scene);

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
