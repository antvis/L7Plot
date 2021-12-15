import React, { Component } from 'react';
import { SimplePoint } from '@antv/l7plot';
import { Scene, GaodeMap } from '@antv/l7';

class SimpleDot extends Component {
  public scene: any;
  constructor(props) {
    super(props);
  }

  async initMap() {
    const scene = new Scene({
      id: 'container',
      map: new GaodeMap({
        style: 'dark',
        center: [121.409765, 31.256735],
        zoom: 4,
        pitch: 0,
      }),
    });
    this.scene = scene;
    const dotData = [
      { lng: 120, lat: 30, val: 1 },
      { lng: 120, lat: 32, val: 2 },
      { lng: 120, lat: 34, val: 3 },
      { lng: null, lat: 36, val: 3 },
      { lng: '123', lat: 38, val: 3 },
    ];
    const dot = new SimplePoint(dotData, {
      color: '#ff0',
      opacity: 0.5,
    });

    scene.on('loaded', () => {
      dot.addTo(scene);

      // console.log(dot.size)
      // dot.size = 10

      // console.log(dot.color)
      // dot.color = '#0f0'

      // dot.size = {
      //   field: 'val',
      //   value: [10, 40]
      // }

      // console.log(dot.data)
      // dot.data = [{ lng: 120, lat: 30, val: 1 }]

      // console.log(dot.opacity)
      // dot.opacity = 0.5

      // console.log(dot.blend)
      // dot.blend = 'additive' // color: '#78FFFF',
      // dot.setBlend('additive')
      // console.log(dot.blend)

      // dot.toggleVisible()
      // console.log(dot.visible)
      // dot.visible = false
      // dot.toggleVisible()

      // console.log(dot.lntlatFilter)
      // dot.lntlatFilter = false

      // console.log(dot.stroke)
      // dot.stroke = '#ff0'

      // console.log(dot.strokeWidth)
      // dot.strokeWidth = 3

      // dot.zIndex = 1
      // dot.setIndex(1)
      // console.log(dot.zIndex)
    });
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    this.scene.destroy();
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

export default SimpleDot;
