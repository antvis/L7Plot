---
title: 快速上手
order: 1
---

## 安装

### 通过 npm 安装

通过下面的命令完成安装：

```js
npm install @antv/l7plot
```

成功安装完成之后，就可以使用了。

```js
import { Dot } from '@antv/l7plot';
```

### 通过浏览器引入

```html
<script type="text/javascript" src="https://unpkg.com/@antv/l7plot@latest/dist/umd/l7plot.min.js"></script>
<script>
  const { Dot } = L7Plot;
</script>
```

## 使用

**1. 创建图表容器**

```html
<div id="container"></div>
```

**2. 引入数据**

```js
const data = [
  { lng: 103.682, lat: 31.206, depth: 10, mag: 5, title: 'M 5.0 - eastern Sichuan, China' },
  { lng: 104.052, lat: 31.503, depth: 10, mag: 5, title: 'M 5.0 - eastern Sichuan, China' },
  { lng: 103.53, lat: 31.1, depth: 10, mag: 5, title: 'M 5.0 - eastern Sichuan, China' },
  { lng: 103.625, lat: 31.243, depth: 10, mag: 5.1, title: 'M 5.1 - eastern Sichuan, China' },
  { lng: 105.134, lat: 32.165, depth: 10, mag: 5, title: 'M 5.0 - Sichuan-Gansu border region, China' },
  { lng: 104.217, lat: 31.636, depth: 10, mag: 5.3, title: 'M 5.3 - eastern Sichuan, China' },
  { lng: 104.908, lat: 32.195, depth: 10, mag: 5, title: 'M 5.0 - Sichuan-Gansu border region, China' },
  { lng: 103.646, lat: 31.216, depth: 10, mag: 5, title: 'M 5.0 - eastern Sichuan, China' },
  { lng: 104.638, lat: 31.857, depth: 10, mag: 5.1, title: 'M 5.1 - eastern Sichuan, China' },
  { lng: 103.747, lat: 31.146, depth: 10, mag: 5.3, title: 'M 5.3 - eastern Sichuan, China' },
  { lng: 105.202, lat: 32.372, depth: 10, mag: 5.1, title: 'M 5.1 - Sichuan-Gansu border region, China' },
  { lng: 104.481, lat: 31.906, depth: 10, mag: 5.1, title: 'M 5.1 - eastern Sichuan, China' },
  { lng: 105.234, lat: 32.436, depth: 10, mag: 5.3, title: 'M 5.3 - Sichuan-Gansu border region, China' },
  { lng: 104.705, lat: 31.272, depth: 10, mag: 5.4, title: 'M 5.4 - eastern Sichuan, China' },
  { lng: 103.715, lat: 31.211, depth: 10, mag: 5.8, title: 'M 5.8 - eastern Sichuan, China' },
  { lng: 104.682, lat: 31.342, depth: 10, mag: 5.7, title: 'M 5.7 - eastern Sichuan, China' },
  { lng: 104.032, lat: 31.586, depth: 10, mag: 5.7, title: 'M 5.7 - eastern Sichuan, China' },
  { lng: 104.787, lat: 31.968, depth: 10, mag: 5.2, title: 'M 5.2 - eastern Sichuan, China' },
  { lng: 103.322, lat: 31.002, depth: 19, mag: 7.9, title: 'M 7.9 - eastern Sichuan, China' },
];
```

**3. 创建图表**

<playground path='dot/bobble/demo/earthquake-level.ts'></playground>

你也可以进入 [L7Plot 图表示例](/zh/examples/gallery)页面查看更多例子。

**4. 销毁图表**

在图表容器被销毁时，总是应调用 plot.destroy() 以销毁实例释放资源，避免内存泄漏。

## 更多

基于 AntV 技术栈还有许多优秀的项目，在 React 环境下使用 L7Plot，我们推荐使用 [Ant Design Chart](https://charts.ant.design)。
