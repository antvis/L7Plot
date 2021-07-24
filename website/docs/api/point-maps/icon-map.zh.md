---
title: 图标地图 - Icon Map
order: 4
---

`IconMap` 继承自 [PointMap](/zh/docs/api/point-maps/point-map)。

## 一、配置

创建地图实例：

```ts
import { IconMap } from '@antv/l7plot';
const iconMap = new IconMap(container, options);
```

### container

`string|HTMLDivElement` required

地图渲染的 DOM 容器。

### options

`IconMapOptions` required

图标地图的所有配置项，继承自 [Map options](/zh/docs/api/map-api#options)。

### `options.`shape

`string|Function|object` optional default: `'circle'`

图标形状，内置以下形状：

- circle: 圆形
- square: 正方形
- hexagon: 六边形
- triangle: 三角形
- pentagon: 五角星
- octogon: 八边形
- hexagram: 六边形
- rhombus: 菱形
- vesica: 椭圆形

除内置图标外，可自定义图标

注册图标

```js
const images = [
  { id: '01', image: 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg' },
  { id: '02', image: 'https://gw.alipayobjects.com/zos/basement_prod/30580bc9-506f-4438-8c1a-744e082054ec.svg' },
  { id: '03', image: 'https://gw.alipayobjects.com/zos/basement_prod/7aa1f460-9f9f-499f-afdf-13424aa26bbf.svg' },
];
registerImages(images);
```

使用注册图标

```js
{
  source: {
    data: [{ lng: 104.101, lat: 30.649, s: '01', n: 'chengdu' }],
    parser: { type: 'json', x: 'lng', y: 'lat' }
  },
  shape: 's'
}
```

#### `shape.`field

`string` optional

图标形状值映射关联字段。

```js
{
  source: {
    data: [{ lng: 104.101, lat: 30.649, s: '01', n: 'chengdu' }],
    parser: { type: 'json', x: 'lng', y: 'lat' }
  },
  shape: {
    fied: 's'
  }
}
```

#### `shape.`value

`string|string[]|Function` optional

图标形状值映射值。

```js
{
  source: {
    data: [{ lng: 104.101, lat: 30.649, t: 24.6, n: 'chengdu' }],
    parser: { type: 'json', x: 'lng', y: 'lat' }
  },
  shape: {
    fied: 't',
    value: ({ t }) => {
      return t > 20 ? '01': '02'
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
    value: ['01', '02'],
    type: 'quantile'
  }
}
```

`markdown:docs/common/attribute/color.zh.md`

`markdown:docs/common/attribute/size.zh.md`

`markdown:docs/common/attribute/style.zh.md`

## 二、属性

继承 [Map 属性](/zh/docs/api/map-api#二、属性)。

### iconLayer

`ILayer`

图标图层实例。

### labelLayer

`undefined|ILayer`

数据标签图层实例。

## 三、方法

继承 [Map 方法](/zh/docs/api/map-api#三、方法)。

## 四、事件

继承 [Map 方法](/zh/docs/api/map-api#四、事件)。

内置图层名称分别为：

- 'iconLayer'
- 'labelLayer'

```js
iconMap.on('iconLayer:click', (e) => {});
// Or
iconMap.iconLayer.on('click', (e) => {});
```
