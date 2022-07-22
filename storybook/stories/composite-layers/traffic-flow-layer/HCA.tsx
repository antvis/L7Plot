import React, { Component } from 'react';
import { Scene, GaodeMapV2 } from '@antv/l7';
import { FlowItem, LocationItem, TrafficFlowLayer } from '@antv/l7-composite-layers';

class OdData extends Component {
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
        center: [121.47583007812501, 31.220435433148147],
        zoom: 9,
      }),
    });

    this.scene.on('loaded', async () => {
      const response = await fetch(
        'https://gw.alipayobjects.com/os/bmw-prod/f4f3e99a-1d6c-4ab0-b08f-ec730c576b62.json'
      );
      const data = await response.json();

      const trafficFlowLayer = new TrafficFlowLayer({
        cluster: {
          clusterType: 'HCA',
          zoomStep: 1,
          clusterLevel: 20,
        },
        fieldGetter: {
          fromLng: 'f_lon',
          fromLat: 'f_lat',
          toLng: 't_lon',
          toLat: 't_lat',
          weight: 'weight',
        },
        source: {
          data,
          // data: data.slice(0, 100),
        },
      });
      this.scene && trafficFlowLayer.addTo(this.scene);

      // trafficFlowLayer.locationLayer.on('click', (e: any) => {
      //   const { id } = e.feature as LocationItem;
      //   console.log(trafficFlowLayer.getLocationData(id));
      // });
      //
      // trafficFlowLayer.flowLayer.on('click', (e) => {
      //   const { id } = e.feature as FlowItem;
      //   console.log(trafficFlowLayer.getFlowData(id));
      // });
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
          overflow: 'hidden',
        }}
      ></div>
    );
  }
}

export default OdData;
