<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.md)

<h1 align="center">L7Plot</h1>

<div align="center">

🌍 Geospatial Visualization Chart Library Based on <a href="https://github.com/antvis/L7">L7</a>.

<!-- [![NPM downloads](https://img.shields.io/npm/dm/@antv/l7plot.svg)](https://npmjs.com/@antv/l7plot) -->
<!-- ![Latest commit](https://badgen.net/github/last-commit/antvis/L7Plot)
 -->

[![Version](https://badgen.net/npm/v/@antv/l7plot)](https://npmjs.com/@antv/l7plot)
[![build Status](https://github.com/antvis/L7Plot/workflows/build/badge.svg?branch=master)](https://github.com/antvis/L7Plot/actions?query=workflow%3Abuild)
[![coverage](https://img.shields.io/coveralls/antvis/L7Plot/master.svg)](https://coveralls.io/github/antvis/L7Plot)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/l7plot.svg)](http://isitmaintained.com/project/antvis/l7plot 'Percentage of issues still open')
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/antvis/l7plot.svg)](http://isitmaintained.com/project/antvis/l7plot 'Average time to resolve an issue')

<p align="center">
  <a href="https://l7plot.antv.vision/en">Website</a> •
  <a href="https://l7plot.antv.vision/en/docs/manual/quick-start">Quick Start</a>
</p>

</div>

## ✨ Features

- Diagrams declaring profile geography Charting
- Rich chart types and map components
- Strong interactive ability, 2 / 3D View
- Built-in multi-granularity administrative data

## 📦 Installation

```bash
$ npm install @antv/l7plot
```

## 🔨 Usage

<div align="center">
<!-- <img src="https://gw.alipayobjects.com/zos/antfincdn/E9LGyUOfkx/865ff168-a623-40aa-9806-ece6357f18e0.png" width="450" /> -->
</div>

<!-- ```html
<div id="container"></div>
``` -->

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
  state: { active: true },
  scale: { position: 'bottomright' },
  legend: { position: 'bottomleft' },
  tooltip: {
    items: ['title', 'mag', 'depth'],
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
