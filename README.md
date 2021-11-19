<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.en-US.md) | 简体中文

<h1 align="center">L7Plot</h1>

<div align="center">
🌍 地理空间可视化图表库。
</div>

## 📦 安装

```bash
$ npm install @antv/l7plot
```

## 🔨 使用

<div align="center">
<img src="https://gw.alipayobjects.com/zos/antfincdn/O2YLUqCydw/6646bc02-5bb5-4c85-af81-d3ed0df040b9.png" width="450" />
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
    pitch: 0,
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

## 如何贡献

如果您在使用的过程中碰到问题，可以先通过 [issues](https://github.com/antvis/l7plot/issues) 看看有没有类似的 bug 或者建议。

如需提交代码，请遵从我们的[贡献指南](https://github.com/antvis/l7plot/blob/master/CONTRIBUTING.zh-CN.md)。
