import React, { Component } from 'react';
import { Choropleth } from '@antv/l7plot';

class ChinaMap extends Component {
  public map: Choropleth | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch('https://gw.alipayobjects.com/os/antfincdn/tsoBzSuDfh/philosophers.json');
    const philosophers = await response.json();
    const philosopherCountryMap = philosophers.reduce((countryMap, philosopher) => {
      const { country } = philosopher;
      if (countryMap[country]) {
        countryMap[country].push(philosopher);
      } else {
        countryMap[country] = [philosopher];
      }
      return countryMap;
    }, {});
    const data = Object.keys(philosopherCountryMap).map((country) => ({
      country,
      philosopherSum: philosopherCountryMap[country].length,
      philosophers: philosopherCountryMap[country],
    }));
    const chinaMap = new Choropleth('container', {
      map: {
        type: 'mapbox',
        style: 'light',
        center: [120.19382669582967, 30.258134],
        zoom: 3,
        pitch: 0,
      },

      viewLevel: {
        level: 'world',
        adcode: 'all',
      },

      source: {
        data: data,
        joinBy: {
          sourceField: 'country',
          geoField: 'name',
        },
      },
      autoFit: true,

      color: {
        field: 'philosopherSum',
        value: ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5'],
        scale: { type: 'quantize' },
      },
      style: {
        opacity: 0.8,
        stroke: '#F2F7F7',
        lineType: 'dash',
        lineDash: [1, 10],
        lineWidth: 0.6,
        lineOpacity: 0.8,
      },
      label: {
        visible: false,
        field: 'name',
        style: {
          fill: '#000',
          opacity: 0.8,
          fontSize: 10,
          stroke: '#fff',
          strokeWidth: 2,
          textAllowOverlap: true,
          padding: [5, 5],
        },
      },
      // state: { active: true, select: false },
      tooltip: {
        items: ['name', 'adcode'],
      },
      zoom: {
        position: 'bottomright',
      },
      // scale: {
      //   position: 'bottomright',
      // },
      legend: {
        position: 'bottomleft',
      },
    });

    this.map = chinaMap;
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

export default ChinaMap;
