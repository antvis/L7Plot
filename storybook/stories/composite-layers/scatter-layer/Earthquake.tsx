import React, { Component } from 'react';
import { Scene, Mapbox } from '@antv/l7';
import { ScatterLayer } from '@antv/l7-composite-layers';
import { Dot } from '@antv/l7plot';

class Earthquake extends Component {
  public scene: Scene | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    this.scene = new Scene({
      id: 'container',
      map: new Mapbox({
        pitch: 0,
        style: 'dark',
        center: [103.447303, 31.753574],
        zoom: 7,
      }),
    });

    const response = await fetch('https://gw.alipayobjects.com/os/antfincdn/m5r7MFHt8U/wenchuandizhenshuju.json');
    const { data } = await response.json();

    const scatterLayer = new ScatterLayer({
      autoFit: true,
      source: {
        data: data,
        parser: {
          type: 'json',
          x: 'lng',
          y: 'lat',
        },
      },
      fillColor: {
        field: 'mag',
        value: ({ mag }) => {
          if (mag > 7) {
            return '#82cf9c';
          } else if (mag <= 7 && mag >= 5.5) {
            return '#10b3b0';
          } else {
            return '#2033ab';
          }
        },
      },
      strokeColor: '#c0c0c0',
      lineWidth: 1,
      radius: {
        field: 'mag',
        value: ({ mag }) => (mag - 4.3) * 10,
      },
      opacity: 0.8,
      label: {
        visible: true,
        field: 'mag',
        style: {
          fill: 'red',
          opacity: 1,
          fontSize: 14,
          textAnchor: 'top', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
          spacing: 1, // 字符间距
          padding: [15, 15], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
          stroke: '#ffffff', // 描边颜色
          strokeWidth: 0.3, // 描边宽度
          textOffset: [0, 20],
        },
      },
      state: {
        active: {
          strokeColor: 'blue',
          lineWidth: 2,
        },
        select: {
          strokeColor: 'yellow',
          lineWidth: 3,
        },
      },
      enabledMultiSelect: true,
    });

    this.scene && scatterLayer.addTo(this.scene);
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    this.scene && this.scene.destroy();
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

export default Earthquake;
