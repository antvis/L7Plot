<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.en-US.md) | 简体中文

<h1 align="center">L7Plot</h1>

<div align="center">

🌍 基于 <a href="https://github.com/antvis/L7">L7</a> 的地理空间可视化图表库。

<!-- [![NPM downloads](https://img.shields.io/npm/dm/@antv/l7plot.svg)](https://npmjs.com/@antv/l7plot) -->

[![Version](https://badgen.net/npm/v/@antv/l7plot)](https://npmjs.com/@antv/l7plot)
![Latest commit](https://badgen.net/github/last-commit/antvis/L7Plot)
[![Release Status](https://github.com/antvis/L7Plot/workflows/release/badge.svg?branch=master)](https://github.com/antvis/L7Plot/actions?query=workflow:release)
[![coverage](https://img.shields.io/coveralls/antvis/L7Plot/master.svg)](https://coveralls.io/github/antvis/L7Plot)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/l7plot.svg)](http://isitmaintained.com/project/antvis/l7plot 'Percentage of issues still open')
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/antvis/l7plot.svg)](http://isitmaintained.com/project/antvis/l7plot 'Average time to resolve an issue')

<p align="center">
  <a href="https://l7plot.antv.vision/zh">网站</a> •
  <a href="https://l7plot.antv.vision/zh/docs/manual/quick-start">快速开始</a> •
  <a href="https://l7plot.antv.vision/zh/docs/api/plot-api">API</a> •
  <a href="https://l7plot.antv.vision/zh/examples/gallery">图表示例</a>
</p>

</div>

## ✨ 特性

- 📦 开箱即用：配置式的地理图表，内置多粒度行政数据
- 🚀 元素丰富：图表类型及地图组件丰富，多地图底图支持
- 💯 容易定制: 数据驱动，从数到形，支持多图层及多图表层叠
- 🌱 动态交互：图表交互能力强、支持 2/3D 视角、提供命令式动态交互 API

## 📦 安装

```bash
$ npm install @antv/l7plot
```

## 🔨 使用

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

## 本地开发

```bash
# 全局安装 yarn
$ npm install yarn -g

# 安装项目依赖
$ yarn bootstrap

# 实时编译各 package 并启动 storybook
$ yarn dev

# 运行网站
$ yarn dev-website

# 运行单元测试
$ yarn test

# 打开 electron 运行单元测试，并监听测试文件
$ yarn test-live
```

## 🤝 如何贡献

如果您在使用的过程中碰到问题，可以先通过 [issues](https://github.com/antvis/l7plot/issues) 看看有没有类似的 bug 或者建议。

如需提交代码，请遵从我们的[贡献指南](https://github.com/antvis/l7plot/blob/master/CONTRIBUTING.zh-CN.md)。

## 许可证

MIT
