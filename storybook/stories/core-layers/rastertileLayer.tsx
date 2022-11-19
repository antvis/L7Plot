import React, { Component } from 'react';
import { Scene, GaodeMap } from '@antv/l7';
import { RasterLayer } from '@antv/l7-composite-layers';
import * as GeoTIFF from 'geotiff';

class ChinaCitys extends Component {
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

    (async () => {
      const raster = new RasterLayer({
        visible: true,
        source: {
          data: 'https://tiles{1-3}.geovisearth.com/base/v1/ter/{z}/{x}/{y}?format=webp&tmsIds=w&token=b2a0cfc132cd60b61391b9dd63c15711eadb9b38a9943e3f98160d5710aef788',
          parser: {
            type: 'rasterTile',
            tileSize: 256,
            zoomOffset: 0,
          },
        },
        style: {
          opacity: 0.8,
        },
      });
      this.scene && raster.addTo(this.scene);
    })();
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
