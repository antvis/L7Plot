import React, { Component } from 'react';
import { Scene, GaodeMap } from '@antv/l7';
import { ImageLayer } from '@antv/l7-composite-layers';

class Demo extends Component {
  public scene: Scene | undefined;
  public raster: RasterLayer | undefined;

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

    const image = new ImageLayer({
      visible: true,
      autoFit: true,
      source: {
        data: 'https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*4k6vT6rUsk4AAAAAAAAAAAAAARQnAQ',
        parser: {
          type: 'image',
          extent: [121.168, 30.2828, 121.384, 30.4219],
        },
      },
      style: {
        opacity: 0.8,
      },
    });
    this.scene && image.addTo(this.scene);
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

export default Demo;
