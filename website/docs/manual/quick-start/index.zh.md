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
  // ......
];
```

**3. 创建图表**

<playground path='dot/bobble/demo/earthquake-level.ts'></playground>

你也可以进入 [L7Plot 图表示例](/zh/examples/gallery)页面查看更多例子。

**4. 销毁图表**

在图表容器被销毁时，总是应调用 plot.destroy() 以销毁实例释放资源，避免内存泄漏。

## 更多

基于 AntV 技术栈还有许多优秀的项目，在 React 环境下使用 L7Plot，我们推荐使用 [Ant Design Chart](https://charts.ant.design)。
