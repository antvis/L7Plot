---
title: 热力地图 - Heat Map
order: 3
---

`HeatMap` 继承基类 [Map](/zh/docs/api/map-api)。

## 一、配置

创建地图实例：

```ts
import { HeatMap } from '@antv/l7plot';
const heatMap = new HeatMap(container, options);
```

### container

`string|HTMLDivElement` required

地图渲染的 DOM 容器。

### options

`HeatMapOptions` required

热力地图的所有配置项，继承自 [Map options](/zh/docs/api/map-api#options)。

### `options.`shape

`string` optional default: `'heatmap'`

元素形状，内置以下形状：

- heatmap
- heatmap3D
- 2D
  - circle: 圆形
  - square: 正方形
  - hexagon: 六边形
  - triangle: 三角形
- 3D
  - cylinder: 圆柱
  - triangleColumn: 三角形柱
  - hexagonColumn: 六角形柱
  - squareColumn: 方柱

```js
{
  shape: 'heatmap';
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

`string|string[]|Function` optional default: `'#5FD3A6'`

元素颜色值映射值。

#### `color.`type

`string` optional default: `''`

关联字段的映射 scale 类型，有以下 scale 类型：

- linear：线性
- power：指数
- log：对数
- quantile：等分位
- quantize：等间距
- cat：枚举

### `options.`size

`number|Function|object` optional default: `12`

元素大小。

```js
{
  size: 12;
}
```

#### `size.`field

`string` optional default: `''`

热力图权重字段。

#### `size.`value

`number|number[]|Function` optional default: `[0, 1]`

热力数据映射区间。

#### `size.`type

`string` optional default: `''`

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
    intensity: 3,
    radius: 20,
    opacity: 1,
    colorsRamp: [
      { color: 'rgba(33,102,172,0.0)', position: 0 },
      { color: 'rgb(103,169,207)', position: 0.2 },
      { color: 'rgb(209,229,240)', position: 0.4 },
      { color: 'rgb(253,219,199)', position: 0.6 },
      { color: 'rgb(239,138,98)', position: 0.8 },
      { color: 'rgb(178,24,43,1.0)', position: 1 },
    ],
  }
}
```

#### `style.`intensity

`number` optional default: `3`

全局热力权重。

#### `style.`radius

`number` optional default: `20`

热力半径，单位像素。

#### `style.`opacity

`number` optional default: `1`

透明度。

#### `style.`coverage

`number` optional default: `1`

热力网格覆盖度，范围 0 到 1。

#### `style.`angle

`number` optional default: `0`

热力网格旋转角度，范围 0 到 360。

#### `style.`colorsRamp

`array` optional

热力色带。

params:

- color: `string` 颜色
- position: `number` 数据

## 二、属性

继承 [Map 属性](/zh/docs/api/map-api#二、属性)。

### heatMapLayer

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

- 'heatMapLayer'
- 'labelLayer'

```js
heatMap.on('heatMapLayer:click', (e) => {});
// Or
heatMap.heatMapLayer.on('click', (e) => {});
```
