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

  const trafficFlowLayer = new FlowLayer({
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
  scene && trafficFlowLayer.addTo(scene);

  const layerPopup = new LayerPopup({
    items: [
      {
        layer: 'locationLayer',
        fields: ['id', 'weight'],
      },
      {
        layer: 'flowLayer',
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
    visible: true,
  };

  gui.add(initialOptions, 'fadeOpacityEnabled');
  gui.add(initialOptions, 'fadeOpacityAmount', 1, 100, 1);
  gui.add(initialOptions, 'maxTopFlowNum', 1, 10000, 1);
  gui.addColor(initialOptions, 'flowColor1');
  gui.addColor(initialOptions, 'flowColor2');
  gui.add(initialOptions, 'visible');

  gui.onChange(({ object: { flowColor1, flowColor2, ...options } }) => {
    options.flowColor = {
      field: 'weight',
      value: [flowColor1, flowColor2],
    };
    trafficFlowLayer.update(options);
  });
});
