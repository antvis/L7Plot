import React, { Component } from 'react';
import { Scene, GaodeMap } from '@antv/l7';
import { TextLayer } from '@antv/l7-composite-layers';

class Demo extends Component {
  public scene: Scene | undefined;
  public textLayer: TextLayer | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    this.scene = new Scene({
      id: 'container',
      map: new GaodeMap({
        pitch: 0,
        style: 'light',
        zoom: 3,
        center: [120.19660949707033, 30.234747338474293],
      }),
    });

    const response = await fetch('https://gw.alipayobjects.com/os/antfincdn/m5r7MFHt8U/wenchuandizhenshuju.json');
    const { data } = await response.json();

    this.textLayer = new TextLayer({
      visible: true,
      source: {
        data: data,
        parser: {
          type: 'json',
          x: 'lng',
          y: 'lat',
        },
      },
      autoFit: true,
      field: 'mag',
      state: {
        active: { color: 'blue' },
      },
      style: {
        fill: '#000',
        opacity: 0.8,
        fontSize: 14,
        textAnchor: 'top', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
        spacing: 1, // 字符间距
        padding: [15, 15], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
        stroke: '#fff', // 描边颜色
        strokeWidth: 2, // 描边宽度
        textOffset: [0, 20],
      },
    });

    this.scene && this.textLayer.addTo(this.scene);
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    this.scene && this.scene.destroy();
  }

  update = () => {
    if (this.scene) {
      this.textLayer?.update({ field: '', visible: false });
    }
  };

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
      >
        <div style={{ position: 'absolute', left: '10px', zIndex: 1 }}>
          <button type="button" onClick={this.update} style={{ marginTop: 8 }}>
            显隐
          </button>
        </div>
      </div>
    );
  }
}

export default Demo;
