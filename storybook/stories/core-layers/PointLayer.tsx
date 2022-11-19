import React, { Component } from 'react';
import { Scene, GaodeMap } from '@antv/l7';
import { PointLayer } from '@antv/l7-composite-layers';

class Demo extends Component {
  public scene: Scene | undefined;
  public pointLayer: PointLayer | undefined;

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

    this.pointLayer = new PointLayer({
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
      shape: 'circle',
      size: {
        field: 'mag',
        value: [10, 40],
      },
      color: {
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
      state: {
        active: { color: 'blue' },
      },
      style: {
        opacity: 0.8,
        stroke: '#c0c0c0',
        strokeOpacity: 0.8,
        strokeWidth: 1,
      },
    });

    const highlightStrokeLayer = new PointLayer({
      visible: false,
      source: {
        data: [],
        parser: {
          type: 'json',
          x: 'lng',
          y: 'lat',
        },
      },
      shape: 'circle',
      size: {
        field: 'mag',
        value: [10, 40],
      },
      style: {
        opacity: 0,
        stroke: 'red',
        strokeOpacity: 1,
        strokeWidth: 5,
      },
    });

    this.pointLayer.on('mousemove', (event) => {
      highlightStrokeLayer.changeData({ data: [event.feature] });
    });
    this.pointLayer.on('mouseout', (event) => {
      highlightStrokeLayer.changeData({ data: [] });
    });

    this.scene && this.pointLayer.addTo(this.scene);
    this.scene && highlightStrokeLayer.addTo(this.scene);
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    this.scene && this.scene.destroy();
  }

  update = () => {
    if (this.scene) {
      this.pointLayer?.toggleVisible();
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
