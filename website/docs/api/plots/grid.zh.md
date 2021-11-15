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

### `options.source.`aggregation

`IGridAggregation` required

生成方格网格布局。

```js
{
  source: {
    data: [{ lng: 104.101, lat: 30.649, t: 24.6, n: 'chengdu' }],
    parser: { type: 'json', x: 'lng', y: 'lat' },
    aggregation: { field: 't', radius: 15000, type: 'sum' }
  }
}
```

#### `aggregation.`field

`string` required

聚合字段。

#### `aggregation.`radius

`number` optional default: `15000`

网格半径。

#### `aggregation.`type

`'count'|'max'|'min'|'sum'|'mean'` optional default: `'sum'`

聚合类型。

### `options.`shape

`string` optional default: `'square'`

元素形状，内置以下形状：

- 2D
  - circle: 圆形
  - triangle: 三角形
  - square: 正方形
- 3D
  - cylinder: 圆柱
  - triangleColumn: 三角柱
  - squareColumn: 方柱

```js
{
  shape: 'square';
}
```

`markdown:docs/common/attribute/color.zh.md`

### `options.`size

`number|object|Function` optional

元素大小。

**shape 为 2D 时，size 无需设置；shape 为 3D 时，size 表示高度。**

```js
{
  size: {
    field: 'value',
    value: ({ value }) => value * 2
  }
}
```

#### `size.`field

`string` required

网格大小映射字段。

#### `size.`value

`number|number[]|Function` optional

网格大小值映射值。

#### `size.`type

`markdown:docs/common/attribute/scale.zh.md`

`markdown:docs/common/attribute/grid-style.zh.md`

`markdown:docs/common/attribute/components.zh.md`

## 二、属性

继承 [Plot 属性](/zh/docs/api/plot-api#二、属性)。

### gridLayer

`PlotLayer`

网格图层实例。

### labelLayer

`undefined|PlotLayer`

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
