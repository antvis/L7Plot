import React, { Component } from 'react';
import { Scene, GaodeMap } from '@antv/l7';
import { RasterLayer } from '@antv/l7-composite-layers';
import * as GeoTIFF from 'geotiff';

async function getTiffData() {
  const response = await fetch('https://gw.alipayobjects.com/os/rmsportal/XKgkjjGaAzRyKupCBiYW.dat');
  const arrayBuffer = await response.arrayBuffer();
  const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
  const image = await tiff.getImage();
  const width = image.getWidth();
  const height = image.getHeight();
  const values = await image.readRasters();
  return {
    data: values[0],
    width,
    height,
    min: 0,
    max: 8000,
  };
}
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
      const tiffdata = await getTiffData();

      const raster = new RasterLayer({
        visible: true,
        autoFit: true,
        source: {
          data: tiffdata.data,
          parser: {
            type: 'raster',
            width: tiffdata.width,
            height: tiffdata.height,
            min: 0,
            max: 80,
            extent: [73.482190241, 3.82501784112, 135.106618732, 57.6300459963],
          },
        },
        style: {
          opacity: 0.8,
          rampColors: {
            colors: ['#FF4818', '#F7B74A', '#FFF598', '#91EABC', '#2EA9A1', '#206C7C'].reverse(),
            positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
          },
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
