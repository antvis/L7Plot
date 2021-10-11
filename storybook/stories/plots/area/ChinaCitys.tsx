import React, { Component } from 'react';
import { Area } from '@antv/l7plot';

class ChinaCitys extends Component {
  public map: Area | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch('https://gw.alipayobjects.com/os/bmw-prod/707cd4be-8ffe-4778-b863-3335eefd5fd5.json');
    const data = await response.json();

    const choroplethMap = new Area('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        center: [120.19382669582967, 30.258134],
        zoom: 3,
        pitch: 0,
      },
      source: {
        data: data,
        parser: {
          type: 'geojson',
        },
      },

      color: {
        field: 'name',
        value: ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'],
      },
      style: {
        opacity: 0.8,
        stroke: '#fff',
        lineType: 'dash',
        lineWidth: 1,
        lineOpacity: 0.5,
      },
      label: {
        visible: true,
        field: 'name',
        style: {
          fill: '#fff',
          opacity: 0.8,
          fontSize: 12,
          textAnchor: 'center', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
          spacing: 1, // 字符间距
          padding: [15, 15], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
          stroke: '#ffffff', // 描边颜色
          strokeWidth: 0.3, // 描边宽度
        },
      },
      state: { active: true, select: false },
      tooltip: {
        items: ['name', 'code'],
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
        position: 'bottomright',
      },
    });

    this.map = choroplethMap;
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

export default ChinaCitys;
