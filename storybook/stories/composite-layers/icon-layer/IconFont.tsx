import React, { Component } from 'react';
import { Scene, GaodeMap } from '@antv/l7';
import { IconFontLayer } from '@antv/l7-composite-layers';

class IconFont extends Component {
  public scene: Scene | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    this.scene = new Scene({
      id: 'container',
      map: new GaodeMap({
        pitch: 0,
        style: 'dark',
        zoom: 3,
        center: [120.19660949707033, 30.234747338474293],
      }),
    });
    const fontFamily = 'iconfont';
    const fontPath = '//at.alicdn.com/t/font_2534097_ao9soua2obv.woff2?t=1622021146076';
    this.scene.addFontFace(fontFamily, fontPath);
    this.scene.addIconFonts([
      ['smallRain', '&#xe6f7;'],
      ['middleRain', '&#xe61c;'],
      ['hugeRain', '&#xe6a6;'],
      ['sun', '&#xe6da;'],
      ['cloud', '&#xe8da;'],
    ]);
    this.scene.on('loaded', () => {
      fetch('https://gw.alipayobjects.com/os/bmw-prod/9eb3f1b5-0c3b-49b2-8221-191d4ba8aa5e.json')
        .then((response) => response.json())
        .then((data) => {
          const iconLayer = new IconFontLayer({
            id: 'iconImageLayer1',
            autoFit: true,
            source: {
              data,
              parser: {
                type: 'json',
                x: 'lng',
                y: 'lat',
              },
            },
            iconAtlas: {
              fontFamily: 'iconfont',
              fontPath: '//at.alicdn.com/t/font_2534097_ao9soua2obv.woff2?t=1622021146076',
              iconFonts: [
                ['smallRain', '&#xe6f7;'],
                ['middleRain', '&#xe61c;'],
                ['hugeRain', '&#xe6a6;'],
                ['sun', '&#xe6da;'],
                ['cloud', '&#xe8da;'],
              ],
            },
            fillColor: 'red',
            icon: {
              field: 'iconType',
              value: 'text',
            },
            iconStyle: {
              textAnchor: 'center', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
              textOffset: [-10, 10], // 文本相对锚点的偏移量 [水平, 垂直]
              fontFamily: 'iconfont',
              textAllowOverlap: true,
              iconfont: true,
            },
            radius: 40,
            opacity: 1,
            label: {
              visible: true,
              field: 'weather',
              style: {
                fill: '#fff',
                opacity: 0.6,
                fontSize: 12,
                textAnchor: 'top',
                textOffset: [0, 40],
                spacing: 1,
                padding: [5, 5],
                stroke: '#ffffff',
                strokeWidth: 0.3,
                strokeOpacity: 1.0,
              },
            },
            state: {
              active: {
                color: 'red',
              },
              select: false,
            },
          });
          this.scene && iconLayer.addTo(this.scene);
        });
    });
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

export default IconFont;
