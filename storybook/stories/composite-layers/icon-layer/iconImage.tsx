import React, { Component } from 'react';
import { Scene, GaodeMapV2 } from '@antv/l7';
import { IconImageLayer } from '@antv/l7-composite-layers';

class IconImage extends Component {
  public scene: Scene | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    this.scene = new Scene({
      id: 'container',
      map: new GaodeMapV2({
        pitch: 0,
        style: 'dark',
        zoom: 3,
        center: [120.19660949707033, 30.234747338474293],
      }),
    });

    fetch('https://gw.alipayobjects.com/os/basement_prod/893d1d5f-11d9-45f3-8322-ee9140d288ae.json')
      .then((response) => response.json())
      .then((data) => {
        const iconLayer = new IconImageLayer({
          id: 'iconImageLayer1',
          autoFit: true,
          source: {
            data,
            parser: {
              type: 'json',
              x: 'longitude',
              y: 'latitude',
            },
          },
          // color:{
          //   value:'red',
          // },
          iconAtlas: {
            icon1: 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg',
            icon2: 'https://gw.alipayobjects.com/zos/basement_prod/7aa1f460-9f9f-499f-afdf-13424aa26bbf.svg',
          },
          icon: {
            field: 'name',
            value: ['icon1', 'icon2'],
          },

          radius: {
            field: 'unit_price',
            value: [1, 20],
          },
          opacity: 1,
          label: {
            field: 'name',
            style: {
              fill: '#fff',
              opacity: 0.6,
              fontSize: 12,
              textAnchor: 'top',
              textOffset: [0, 20],
              spacing: 1,
              padding: [5, 5],
              stroke: '#ffffff',
              strokeWidth: 0.3,
              strokeOpacity: 1.0,
            },
          },
          state: {
            active: {
              radius: 20,
              opacity: 1,
            },
            select: {
              radius: 20,
              opacity: 1,
            },
          },
        });
        this.scene && iconLayer.addTo(this.scene);
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

export default IconImage;
