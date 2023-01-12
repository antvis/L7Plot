---
title: 网格聚合图 - Grid
order: 4
---

`GridMap` 继承基类 [Plot](/zh/docs/api/plot-api)。

## 一、配置

创建地图实例：

```ts
import { GridMap } from '@antv/l7plot';
const gridMap = new GridMap(container, options);
```

### container

`string|HTMLDivElement` required

地图渲染的 DOM 容器。

### options

`GridMapOptions` required

蜂窝地图的所有配置项，继承自 [Plot options](/zh/docs/api/plot-api#options)。

<embed src="@/docs/common/layers/grid-layer/source.zh.md"></embed>

<embed src="@/docs/common/layers/grid-layer/shape.zh.md"></embed>

<embed src="@/docs/common/attribute/color.zh.md"></embed>

<embed src="@/docs/common/layers/grid-layer/size.zh.md"></embed>

<embed src="@/docs/common/layers/grid-layer/style.zh.md"></embed>

<embed src="@/docs/common/attribute/components.zh.md"></embed>

## 二、属性

继承 [Plot 属性](/zh/docs/api/plot-api#二、属性)。

### gridLayer

`GridLayer`

网格图层实例。

### labelLayer

`undefined|GridLayer`

数据标签图层实例。

## 三、方法

继承 [Plot 方法](/zh/docs/api/plot-api#三、方法)。

## 四、事件

继承 [Plot 方法](/zh/docs/api/plot-api#四、事件)。

内置图层名称分别为：

- gridLayer
- labelLayer

```js
gridMap.on('gridLayer:click', (e: MouseEvent) => void);
```
