import React, { Component } from 'react';
import { Scene, Mapbox } from '@antv/l7';
import { ChoroplethLayer } from '@antv/l7-composite-layers';

class ChinaCitys extends Component {
  public scene: Scene | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    this.scene = new Scene({
      id: 'container',
      map: new Mapbox({
        pitch: 0,
        style: 'dark',
        zoom: 3,
        center: [120.19660949707033, 30.234747338474293],
      }),
    });

    fetch('https://gw.alipayobjects.com/os/bmw-prod/707cd4be-8ffe-4778-b863-3335eefd5fd5.json')
      .then((response) => response.json())
      .then((data) => {
        const choroplethLayer = new ChoroplethLayer({
          source: {
            data: data,
            parser: {
              type: 'geojson',
            },
          },
          fillColor: {
            field: 'name',
            value: ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'],
          },
          opacity: 0.8,
          strokeColor: '#ccc',
          lineType: 'solid',
          lineWidth: 0.6,
          lineOpacity: 1,
          label: {
            visible: true,
            field: 'name',
            style: {
              fill: '#000',
              opacity: 0.8,
              fontSize: 10,
              stroke: '#fff',
              strokeWidth: 2,
              textAllowOverlap: false,
              padding: [5, 5],
            },
          },
          state: {
            active: {
              strokeColor: 'blue',
            },
            select: {
              strokeColor: 'yellow',
              lineWidth: 1,
              lineOpacity: 0.8,
            },
          },
          enabledMultiSelect: true,
        });

        this.scene && choroplethLayer.addTo(this.scene);
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

export default ChinaCitys;
