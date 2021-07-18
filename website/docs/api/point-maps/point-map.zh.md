---
title: 点地图 - Point Map
order: 0
---

`PointMap` 继承基类 [Map](/zh/docs/api/map-api)。

## 一、配置

创建地图实例：

```ts
import { PointMap } from '@antv/l7plot';
const pointMap = new PointMap(container, options);
```

### container

`string|HTMLDivElement` required

地图渲染的 DOM 容器。

### options

`PointMapOptions` required

点地图的所有配置项，继承自 [Map options](/zh/docs/api/map-api#options)。

### `options.`shape

`string|Function|object` optional default: `'circle'`

元素形状，内置以下形状：

- 2D
  - circle: 圆形
  - square: 正方形
  - hexagon: 六边形
  - triangle: 三角形
  - pentagon: 五角星
  - octogon: 八边形
  - hexagram: 六边形
  - rhombus: 菱形
  - vesica: 椭圆形
  - dot: 圆点
- 3D
  - cylinder: 圆柱
  - triangleColumn: 三角形柱
  - hexagonColumn: 六角形柱
  - squareColumn: 方柱

```js
{
  shape: 'circle';
}
```

#### `shape.`field

`string` optional default: `''`

元素形状值映射关联字段。

```js
{
  source: {
    data: [{ lng: 104.101, lat: 30.649, s: 'circle', n: 'chengdu' }],
    parser: { type: 'json', x: 'lng', y: 'lat' }
  },
  shape: {
    fied: 's'
  }
}
```

#### `shape.`value

`string|string[]|Function` optional default: `'circle'`

元素形状值映射值。

```js
{
  source: {
    data: [{ lng: 104.101, lat: 30.649, t: 24.6, n: 'chengdu' }],
    parser: { type: 'json', x: 'lng', y: 'lat' }
  },
  shape: {
    fied: 't',
    value: ({ t }) => {
      return t > 20 ? 'triangle': 'circle'
    }
  }
}
```

#### `shape.`type

`string` optional default: `''`

关联字段的映射 scale 类型，有以下 scale 类型：

- linear：线性
- power：指数
- log：对数
- quantile：等分位
- quantize：等间距
- cat：枚举

```js
{
  source: {
    data: [{ lng: 104.101, lat: 30.649, t: 24.6, n: 'chengdu' }],
    parser: { type: 'json', x: 'lng', y: 'lat' }
  },
  shape: {
    fied: 't',
    value: ['circle', 'triangle'],
    type: 'quantile'
  }
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

```js
{
  source: {
    data: [{ lng: 104.101, lat: 30.649, c: 'red', n: 'chengdu' }],
    parser: { type: 'json', x: 'lng', y: 'lat' }
  },
  color: {
    fied: 'c'
  }
}
```

#### `color.`value

`string|string[]|Function` optional default: `'#5FD3A6'`

元素颜色值映射值。

```js
{
  source: {
    data: [{ lng: 104.101, lat: 30.649, t: 24.6, n: 'chengdu' }],
    parser: { type: 'json', x: 'lng', y: 'lat' }
  },
  color: {
    fied: 't',
    value: ({ t }) => {
      return t > 20 ? 'red': 'blue'
    }
  }
}
```

#### `color.`type

`string` optional default: `''`

关联字段的映射 scale 类型，有以下 scale 类型：

- linear：线性
- power：指数
- log：对数
- quantile：等分位
- quantize：等间距
- cat：枚举

```js
{
  source: {
    data: [{ lng: 104.101, lat: 30.649, t: 24.6, n: 'chengdu' }],
    parser: { type: 'json', x: 'lng', y: 'lat' }
  },
  color: {
    fied: 't',
    value: ['blue', 'red'],
    type: 'quantile'
  }
}
```

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

元素大小值映射关联字段。

```js
{
  source: {
    data: [{ lng: 104.101, lat: 30.649, s: 12, n: 'chengdu' }],
    parser: { type: 'json', x: 'lng', y: 'lat' }
  },
  size: {
    fied: 's'
  }
}
```

#### `size.`value

`number|number[]|Function` optional default: `12`

元素大小值映射值。

```js
{
  source: {
    data: [{ lng: 104.101, lat: 30.649, t: 24.6, n: 'chengdu' }],
    parser: { type: 'json', x: 'lng', y: 'lat' }
  },
  size: {
    fied: 't',
    value: ({ t }) => {
      return t > 20 ? 15 : 12
    }
  }
}
```

#### `size.`type

`string` optional default: `''`

关联字段的映射 scale 类型，有以下 scale 类型：

- linear：线性
- power：指数
- log：对数
- quantile：等分位
- quantize：等间距
- cat：枚举

```js
{
  source: {
    data: [{ lng: 104.101, lat: 30.649, t: 24.6, n: 'chengdu' }],
    parser: { type: 'json', x: 'lng', y: 'lat' }
  },
  size: {
    fied: 't',
    value: [12, 15],
    type: 'quantile'
  }
}
```

### `options.`style

`object` optional

点图形全局样式。

```js
{
  style: {
    opacity: 0.8,
    stroke: 'white',
    strokeWidth: 2
  }
}
```

#### `style.`opacity

`number` optional

图形透明度。

#### `style.`stroke

`string` optional

图形边线填充颜色。

#### `style.`strokeWidth

`number` optional

图形线的宽度。

## 二、属性

继承 [Map 属性](/zh/docs/api/map-api#二、属性)。

### pointLayer

`ILayer`

点图层实例。

### labelLayer

`undefined|ILayer`

标注图层实例。

## 三、方法

继承 [Map 方法](/zh/docs/api/map-api#三、方法)。

## 四、事件

继承 [Map 方法](/zh/docs/api/map-api#四、事件)。

内置图层名称分别为：

- 'pointLayer'
- 'labelLayer'

```js
pointMap.on('pointLayer:click', (e) => {});
// Or
pointMap.pointLayer.on('click', (e) => {});
```
