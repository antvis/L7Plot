import React, { Component } from 'react';
import { Scene, GaodeMap } from '@antv/l7';
import { Choropleth } from '@antv/l7plot';

class ChoroplethDrill extends Component {
  public scene: Scene | undefined;
  public choropleth: Choropleth | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
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

    const choropleth = new Choropleth({
      source: {
        data: [],
        joinBy: {
          sourceField: 'code',
          geoField: 'adcode',
        },
      },

      viewLevel: {
        level: 'country',
        adcode: '100000',
        granularity: 'province',
      },
      autoFit: true,

      drill: {
        steps: ['province', 'city', 'district'],
        onDown: (from, to, callback) => {
          const { level, adcode, granularity } = to;
          this.choropleth?.drillDown(
            { level, adcode, granularity },
            { source: { data: [], joinBy: { sourceField: 'code' } } }
          );
        },
        onUp: (from, to, callback) => {
          this.choropleth?.drillUp();
        },
      },

      color: {
        field: 'name',
        value: ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70'],
      },
      style: {
        opacity: 0.8,
        stroke: '#F2F7F7',
        lineType: 'dash',
        lineDash: [1, 10],
        lineWidth: 0.6,
        lineOpacity: 0.8,
      },
      state: { active: { stroke: 'red' } },
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
      tooltip: {
        items: ['name', 'adcode'],
      },
      zoom: {
        position: 'bottomright',
      },
      scale: {
        position: 'bottomright',
      },
      legend: {
        position: 'bottomleft',
      },
    });

    scene.on('loaded', () => {
      choropleth.addToScene(scene);
    });

    this.scene = scene;
    this.choropleth = choropleth;
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

export default ChoroplethDrill;
