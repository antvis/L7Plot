import { GaodeMap, Scene } from '@antv/l7';
import { ChoroplethLayer } from '@antv/l7-composite-layers';
import { Component } from 'react';

class Demo extends Component {
  public scene: Scene | undefined;
  public choroplethLayer: ChoroplethLayer | undefined;

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

    fetch('https://gw.alipayobjects.com/os/basement_prod/1d27c363-af3a-469e-ab5b-7a7e1ce4f311.json')
      .then((response) => response.json())
      .then((data) => {
        this.choroplethLayer = new ChoroplethLayer({
          source: {
            data: data,
            parser: {
              type: 'geojson',
            },
          },
          autoFit: true,
          opacity: 0.3,
          fillColor: 'blue',
          state: {
            active: {
              fillColor: 'red',
              strokeColor: 'green',
              lineWidth: 1.5,
              lineOpacity: 0.8,
            },
            select: false,
          },
          label: {
            field: 'name',
            visible: true,
            style: { fill: 'blue', fontSize: 12, stroke: '#fff', strokeWidth: 2 },
          },
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

  handlerAcitve = () => {
    if (this.choroplethLayer) {
      const source = this.choroplethLayer.source;
      const id = source.getFeatureId('id', 611100396);
      console.log(id);
      this.choroplethLayer.setActive('id', 611100396);
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
          <button type="button" onClick={this.handlerAcitve} style={{ marginTop: 8 }}>
            选中
          </button>
        </div>
      </div>
    );
  }
}

export default Demo;
