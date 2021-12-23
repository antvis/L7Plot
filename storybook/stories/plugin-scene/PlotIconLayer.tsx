import React, { Component } from 'react';
import { Scene, GaodeMap } from '@antv/l7';
import { IconLayer } from '@antv/l7plot';

const images = [
  { id: '01', image: 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg' },
  { id: '02', image: 'https://gw.alipayobjects.com/zos/basement_prod/30580bc9-506f-4438-8c1a-744e082054ec.svg' },
];

class PlotIconLayer extends Component {
  public scene: Scene | undefined;
  public iconLayer: IconLayer | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const iconLayer = new IconLayer({
      source: {
        data: [
          { x: 120.1, y: 32.5, id: '01' },
          { x: 120, y: 32.5, id: '02' },
        ],
      },
      shape: { field: 'id', value: ({ id }) => id },
    });

    const scene = new Scene({
      id: 'container',
      map: new GaodeMap({
        pitch: 0,
        style: 'dark',
        center: [102.447303, 37.753574],
        zoom: 5.32,
        maxZoom: 10,
      }),
    });

    images.forEach((image) => scene.addImage(image.id, image.image));

    scene.on('loaded', () => {
      iconLayer.addTo(scene);
      iconLayer.fitBounds();
    });

    this.scene = scene;
    this.iconLayer = iconLayer;
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

export default PlotIconLayer;
