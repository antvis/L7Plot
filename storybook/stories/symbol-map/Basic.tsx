import React, { Component } from 'react';
import { SymbolMap } from '@antv/l7plot';

class Basic extends Component {
  public map: SymbolMap | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const symbolMap = new SymbolMap('container', {
      map: {
        type: 'mapbox',
        style: 'dark',
        center: [102.447303, 37.753574],
        zoom: 2,
        pitch: 0,
      },
      source: {
        data: [],
      },
    });

    this.map = symbolMap;
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

export default Basic;
