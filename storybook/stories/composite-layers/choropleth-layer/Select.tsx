import React, { Component } from 'react';
import { Scene, Mapbox } from '@antv/l7';
import { ChoroplethLayer } from '@antv/l7-composite-layers';

class Demo extends Component {
  public scene: Scene | undefined;
  public choroplethLayer: ChoroplethLayer | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    this.scene = new Scene({
      id: 'container',
      map: new Mapbox({
        pitch: 0,
        style: 'light',
        zoom: 3,
        center: [120.19660949707033, 30.234747338474293],
      }),
    });

    fetch('https://gw.alipayobjects.com/os/basement_prod/d36ad90e-3902-4742-b8a2-d93f7e5dafa2.json')
      .then((response) => response.json())
      .then((data) => {
        this.choroplethLayer = new ChoroplethLayer({
          visible: true,
          autoFit: true,
          source: {
            data: data,
            parser: {
              type: 'geojson',
            },
          },
          fillColor: {
            field: 'density',
            value: [
              '#1A4397',
              '#2555B7',
              '#3165D1',
              '#467BE8',
              '#6296FE',
              '#7EA6F9',
              '#98B7F7',
              '#BDD0F8',
              '#DDE6F7',
              '#F2F5FC',
            ].reverse(),
            scale: { type: 'quantile' },
          },
          opacity: 0.8,
          strokeColor: 'rgb(93,112,146)',
          lineType: 'dash',
          lineDash: [2, 2],
          lineWidth: 0.6,
          lineOpacity: 1,
          label: {
            visible: true,
            field: 'name',
            style: {
              fill: 'black',
              opacity: 0.5,
              fontSize: 12,
              spacing: 1,
              padding: [15, 15],
            },
          },
          state: {
            active: true,
            select: {
              strokeColor: 'yellow',
              lineWidth: 1,
              lineOpacity: 1,
            },
          },
          enabledMultiSelect: true,
        });

        this.scene?.on('selectend', (bbox) => {
          console.log('bbox: ', bbox);
          // const min = this.scene?.lngLatToContainer([bbox[0], bbox[1]]);
          // const max = this.scene?.lngLatToContainer([bbox[2], bbox[3]]);
          // const pixelBbox = [min?.x, min?.y, max?.x, max?.y] as unknown as [number, number, number, number];
          // console.log('pixelBbox: ', pixelBbox);

          // this.choroplethLayer?.boxSelect(bbox, (features: Record<string, any>[]) => {
          //   console.log('features: ', features);
          //   features.forEach((item) => {
          //     if (item['properties']?.name) {
          //       this.choroplethLayer?.setSelect('name', item['properties']?.name);
          //     }
          //   });
          // });

          // this.choroplethLayer?.setSelect('name', 'Washington');
          // this.choroplethLayer?.setSelect('name', 'Oregon');
          // this.choroplethLayer?.setSelect('name', 'Montana');
          // this.choroplethLayer?.setSelect('name', 'Idaho');
        });

        this.scene && this.choroplethLayer.addTo(this.scene);
      });
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    this.scene && this.scene.destroy();
  }

  boxSelect = () => {
    if (this.scene) {
      this.scene.enableBoxSelect();
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
          <button type="button" onClick={this.boxSelect} style={{ marginTop: 8 }}>
            框选
          </button>
        </div>
      </div>
    );
  }
}

export default Demo;
