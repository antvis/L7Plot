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

`string` optional

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

`string|string[]|Function` optional

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

`markdown:docs/common/attribute/scale.zh.md`

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

`markdown:docs/common/attribute/color.zh.md`

`markdown:docs/common/attribute/size.zh.md`

`markdown:docs/common/attribute/style.zh.md`

`markdown:docs/common/attribute/components.zh.md`

## 二、属性

继承 [Map 属性](/zh/docs/api/map-api#二、属性)。

### pointLayer

`ILayer`

点图层实例。

### labelLayer

`undefined|ILayer`

数据标签图层实例。

## 三、方法

继承 [Map 方法](/zh/docs/api/map-api#三、方法)。

## 四、事件

继承 [Map 方法](/zh/docs/api/map-api#四、事件)。

内置图层名称分别为：

- 'pointLayer'
- 'labelLayer'

```js
pointMap.on('pointLayer:click', (e) => {});
```
