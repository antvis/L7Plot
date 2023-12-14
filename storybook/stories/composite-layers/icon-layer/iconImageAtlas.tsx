import React, { Component } from 'react';
import { Scene, GaodeMap } from '@antv/l7';
import { IconImageLayer } from '@antv/l7-composite-layers';

class iconImageAtlas extends Component {
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
    this.scene.on('loaded', () => {
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
            iconAtlas: {
              icon1: 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg',
              icon2: 'https://gw.alipayobjects.com/zos/basement_prod/7aa1f460-9f9f-499f-afdf-13424aa26bbf.svg',
              empty: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*EcQZS6JM69EAAAAAAAAAAAAADmJ7AQ/original',
            },
            icon: {
              field: 'name',
              value: ['icon1', 'icon2'],
              scale: {
                type: 'cat',
                domain: ['新体育广场', '梅岭新村'],
                unknown: 'empty',
              },
            },
            label: {
              field: 'name',
              style: {
                fill: '#0f0',
                opacity: 0.7,
                fontSize: 12,
                textAnchor: 'top',
                textOffset: [0, -40],
                spacing: 1,
                padding: [5, 5],
                stroke: '#ffffff',
                strokeWidth: 0.3,
                strokeOpacity: 1.0,
              },
            },
          });
          this.scene && iconLayer.addTo(this.scene);

          setTimeout(() => {
            iconLayer.update({
              iconAtlas: {
                icon3: 'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*kzTMQqS2QdUAAAAAAAAAAABkARQnAQ',
                icon4: 'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*jH1XRb7F7hMAAAAAAAAAAABkARQnAQ',
                empty: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*EcQZS6JM69EAAAAAAAAAAAAADmJ7AQ/original',
              },
              icon: {
                field: 'name',
                value: ['icon3', 'icon4'],
                scale: {
                  type: 'cat',
                  domain: ['新体育广场', '梅岭新村'],
                  unknown: 'empty',
                },
              },
            });
            console.log('update');
          }, 1000 * 5);
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

export default iconImageAtlas;
