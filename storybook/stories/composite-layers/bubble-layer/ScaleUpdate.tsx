import React, { Component } from 'react';
import { Scene, GaodeMap } from '@antv/l7';
import { BubbleLayer } from '@antv/l7-composite-layers';

class ScaleUpdate extends Component {
  public scene: Scene | undefined;
  public bubbleLayer: BubbleLayer | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    this.scene = new Scene({
      id: 'container',
      map: new GaodeMap({
        token: '6f025e700cbacbb0bb866712d20bb35c',
        pitch: 0,
        style: 'dark',
        zoom: 3,
        center: [120.19660949707033, 30.234747338474293],
      }),
    });

    const response = await fetch('https://mdn.alipayobjects.com/afts/file/A*8ARuTJPfyvcAAAAAAAAAAAAADrd2AQ/earthquake');
    const data = await response.json();

    this.bubbleLayer = new BubbleLayer({
      id: 'BubbleLayer1',
      autoFit: true,
      source: {
        data,
        parser: {
          type: 'json',
          x: 'Longitude',
          y: 'Latitude',
        },
      },
      fillColor: {
        field: 'Magnitude',
        value: ['#d7191c', '#fdae61', '#a6d96a', '#1a9641'],
        scale: {
          type: 'threshold',
          domain: [3.67, 4.85, 6.03],
          unknown: '#f000',
        },
      },
      // fillColor: {
      //   field: 'MagType',
      //   value: ['#ffffcc', '#c2e699', '#78c679', '#238443', '#238443', '#238443'],
      //   scale: {
      //     type: 'cat',
      //     domain: ['Md', 'ML', 'Mw', 'Mx', 'Unk', 'Mh'],
      //     unknown: '#f000',
      //   },
      // },
      opacity: 0.8,
      strokeColor: '#fff',
      lineWidth: 1,
      lineOpacity: 1,
    });

    this.scene && this.bubbleLayer.addTo(this.scene);
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    this.scene && this.scene.destroy();
  }

  update = () => {
    if (this.scene) {
      this.bubbleLayer?.update({
        fillColor: {
          field: 'MagType',
          value: ['#d7191c', '#1a9641'],
          scale: {
            type: 'cat',
            // unknown: '#fff',
          },
        },
        // fillColor: {
        //   field: 'Depth',
        //   value: ['#ffffd4', '#fed98e', '#fe9929', '#cc4c02'],
        //   scale: {
        //     type: 'quantize',
        //     unknown: '#fff',
        //   },
        // },
      });
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
            update
          </button>
        </div>
      </div>
    );
  }
}

export default ScaleUpdate;
