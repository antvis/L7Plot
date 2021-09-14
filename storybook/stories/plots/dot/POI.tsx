import React, { Component } from 'react';
import { registerImages, Dot } from '@antv/l7plot';

class POI extends Component {
  public map: Dot | undefined;

  constructor(props) {
    super(props);
    const images = [
      { id: '01', image: 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg' },
      { id: '02', image: 'https://gw.alipayobjects.com/zos/basement_prod/30580bc9-506f-4438-8c1a-744e082054ec.svg' },
      { id: '03', image: 'https://gw.alipayobjects.com/zos/basement_prod/7aa1f460-9f9f-499f-afdf-13424aa26bbf.svg' },
    ];
    registerImages(images);
  }

  async initMap() {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/basement_prod/893d1d5f-11d9-45f3-8322-ee9140d288ae.json'
    );
    const data = await response.json();

    const iconMap = new Dot('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        center: [121.409765, 31.256735],
        zoom: 14.5,
        pitch: 0,
      },
      source: {
        data: data,
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude',
        },
      },

      shape: {
        field: 'name',
        value: ['01', '02', '03'],
      },
      size: 20,
      color: '#fff',
    });

    this.map = iconMap;
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    this.map && this.map.destroy();
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

export default POI;
