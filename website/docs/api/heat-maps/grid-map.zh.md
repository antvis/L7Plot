---
title: 网格地图 - Grid Map
order: 1
---

`GridMap` 继承基类 [Map](/zh/docs/api/map-api)。

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

热力地图的所有配置项，继承自 [Map options](/zh/docs/api/map-api#options)。

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

### `options.`color

`string|Function|object` optional default: `'#5FD3A6'`

元素颜色。

```js
{
  color: 'red';
}
```

#### `color.`field

`string` optional default: `''`

元素颜色值映射关联字段。

#### `color.`value

`string|string[]|Function` optional

元素颜色值映射值。

#### `color.`type

`string` optional default: `'linear'`

关联字段的映射 scale 类型，有以下 scale 类型：

- linear：线性
- power：指数
- log：对数
- quantile：等分位
- quantize：等间距
- cat：枚举

### `options.`size

`number|Function|object` optional

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

`string` optional default: `'linear'`

关联字段的映射 scale 类型，有以下 scale 类型：

- linear：线性
- power：指数
- log：对数
- quantile：等分位
- quantize：等间距
- cat：枚举

### `options.`style

`object` optional

热力全局样式。

```js
{
  style: {
    coverage: 0.9,
    angle: 0,
    opacity: 1.0,
  }
}
```

#### `style.`opacity

`number` optional default: `1`

透明度。

#### `style.`coverage

`number` optional default: `0.9`

热力网格覆盖度，范围 0 到 1。

#### `style.`angle

`number` optional default: `0`

热力网格旋转角度，范围 0 到 360。

## 二、属性

继承 [Map 属性](/zh/docs/api/map-api#二、属性)。

### gridLayer

`ILayer`

热力图层实例。

### labelLayer

`undefined|ILayer`

标注图层实例。

## 三、方法

继承 [Map 方法](/zh/docs/api/map-api#三、方法)。

## 四、事件

继承 [Map 方法](/zh/docs/api/map-api#四、事件)。

内置图层名称分别为：

- 'gridLayer'
- 'labelLayer'

```js
gridMap.on('gridLayer:click', (e) => {});
// Or
gridMap.gridLayer.on('click', (e) => {});
```
