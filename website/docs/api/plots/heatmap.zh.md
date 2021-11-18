---
title: 热力图 - Heatmap
order: 3
---

`Heatmap` 继承基类 [Plot](/zh/docs/api/plot-api)。

## 一、配置

创建地图实例：

```ts
import { Heatmap } from '@antv/l7plot';
const heatmap = new Heatmap(container, options);
```

### container

`string|HTMLDivElement` required

地图渲染的 DOM 容器。

### options

`HeatmapOptions` required

热力地图的所有配置项，继承自 [Plot options](/zh/docs/api/plot-api#options)。

`markdown:docs/common/layers/dot-layer/source.zh.md`

`markdown:docs/common/layers/heatmap-layer/shape.zh.md`

`markdown:docs/common/layers/heatmap-layer/size.zh.md`

`markdown:docs/common/layers/heatmap-layer/style.zh.md`

`markdown:docs/common/attribute/components.zh.md`

## 二、属性

继承 [Plot 属性](/zh/docs/api/plot-api#二、属性)。

### heatmapLayer

`HeatmapLayer`

热力图层实例。

### labelLayer

`undefined|TextLayer`

数据标签图层实例。

## 三、方法

继承 [Plot 方法](/zh/docs/api/plot-api#三、方法)。

## 四、事件

继承 [Plot 方法](/zh/docs/api/plot-api#四、事件)。

内置图层名称分别为：

- heatmapLayer
- labelLayer

```js
heatmap.on('heatmapLayer:click', (e: MouseEvent) => void);
```
