<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.md)

<h1 align="center">L7Plot</h1>

<div align="center">
🌍 Geospatial Visualization Chart Library
</div>

## 📦 Installation

```bash
$ npm install @antv/l7plot
```

## 🔨 Usage

<div align="center">
<img src="https://gw.alipayobjects.com/zos/antfincdn/E9LGyUOfkx/865ff168-a623-40aa-9806-ece6357f18e0.png" width="450" />
</div>

```html
<div id="container"></div>
```

```ts
import { Dot } from '@antv/l7plot';

const data = [
  { lng: 103.715, lat: 31.211, depth: 10, mag: 5.8, title: 'M 5.8 - eastern Sichuan, China' },
  { lng: 104.682, lat: 31.342, depth: 10, mag: 5.7, title: 'M 5.7 - eastern Sichuan, China' },
  // ...
];

const dot = new Dot('container', {
  map: {
    type: 'mapbox',
    style: 'light',
    center: [103.447303, 31.753574],
    zoom: 7,
  },
  autoFit: true,
  source: {
    data: data,
    parser: { type: 'json', x: 'lng', y: 'lat' },
  },
  color: {
    field: 'mag',
    value: ['#82cf9c', '#10b3b0', '#2033ab'],
    scale: { type: 'quantize' },
  },
  size: {
    field: 'mag',
    value: ({ mag }) => (mag - 4.3) * 10,
  },
  state: {
    active: true,
  },
  zoom: {
    position: 'topright',
  },
  scale: {
    position: 'bottomright',
  },
  tooltip: {
    items: ['title', 'mag', 'depth'],
  },
  legend: {
    position: 'bottomleft',
  },
});
```

## Local Development

```bash
# Global installation yarn
$ npm install yarn -g

# Install project dependencies
$ yarn bootstrap

# Compile each package in real time and start the storybook
$ yarn dev

# Run website
$ yarn dev-website

# Run unit tests
$ yarn test

# open electron for unit tests
$ yarn test-live
```

## 🤝 How to Contribute

Your contributions are always welcome! Please Do have a look at the [issues](https://github.com/antvis/l7plot/issues) first.

To become a contributor, please follow our [contributing guide](https://github.com/antvis/l7plot/blob/master/CONTRIBUTING.md).

## License

MIT
