import { GaodeMapV2, LayerPopup, Scene } from '@antv/l7';
import { FlowLayer } from '@antv/l7-composite-layers';
import GUI from 'lil-gui';

const scene = new Scene({
  id: 'container',
  map: new GaodeMapV2({
    pitch: 0,
    style: 'dark',
    center: [121.458794, 31.205302],
    zoom: 10.95,
  }),
});

scene.on('loaded', async () => {
  const response = await fetch('https://gw.alipayobjects.com/os/bmw-prod/f4f3e99a-1d6c-4ab0-b08f-ec730c576b62.json');
  const data = await response.json();

  const flowLayer = new FlowLayer({
    source: {
      data,
      parser: {
        type: 'json',
        x: 'f_lon',
        y: 'f_lat',
        x1: 't_lon',
        y1: 't_lat',
        weight: 'weight',
      },
    },
  });

  flowLayer.on('circleLayer:click', (e) => console.log('circle layer click', e));
  flowLayer.on('lineLayer:click', (e) => console.log('line layer click', e));
  scene && flowLayer.addTo(scene);

  const layerPopup = new LayerPopup({
    items: [
      {
        layer: 'circleLayer',
        fields: ['id', 'weight'],
      },
      {
        layer: 'lineLayer',
        fields: ['id', 'weight'],
      },
    ],
  });
  scene.addPopup(layerPopup);

  const gui = new GUI({
    // eslint-disable-next-line no-undef
    container: document.querySelector('#container'),
  });

  const initialOptions = {
    fadeOpacityEnabled: true,
    fadeOpacityAmount: 0,
    maxTopFlowNum: 5000,
    flowColor1: '#2a5674',
    flowColor2: '#d1eeea',
    lineStroke: '#000',
    lineStrokeWidth: 1,
    lineStrokeOpacity: 1,
    visible: true,
  };

  gui.add(initialOptions, 'fadeOpacityEnabled');
  gui.add(initialOptions, 'fadeOpacityAmount', 1, 100, 1);
  gui.add(initialOptions, 'maxTopFlowNum', 1, 10000, 1);
  gui.addColor(initialOptions, 'flowColor1');
  gui.addColor(initialOptions, 'flowColor2');
  gui.add(initialOptions, 'visible');
  gui.addColor(initialOptions, 'lineStroke');
  gui.add(initialOptions, 'lineStrokeWidth', 1, 10, 1);
  gui.add(initialOptions, 'lineStrokeOpacity', 0, 1, 0.01);

  gui.onChange(({ object: { flowColor1, flowColor2, ...options } }) => {
    options.lineColor = {
      field: 'weight',
      value: [flowColor1, flowColor2],
    };
    flowLayer.update(options);
  });
});
