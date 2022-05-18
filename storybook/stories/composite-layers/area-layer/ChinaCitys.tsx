import React, { Component } from 'react';
import { Scene, Mapbox } from '@antv/l7';
import { AreaLayer } from '@antv/l7-composite-layers';

class ChinaCitys extends Component {
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
        zoom: 3,
        center: [120.19660949707033, 30.234747338474293],
      }),
    });

    fetch('https://gw.alipayobjects.com/os/bmw-prod/707cd4be-8ffe-4778-b863-3335eefd5fd5.json')
      .then((response) => response.json())
      .then((data) => {
        const areaLayer = new AreaLayer({
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
          state: {
            active: true,
            select: {
              stroke: 'yellow',
              lineWidth: 1.5,
              lineOpacity: 0.8,
            },
          },
          enabledMultiSelect: true,
        });

        this.scene && areaLayer.addTo(this.scene);
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

export default ChinaCitys;
