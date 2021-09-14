---
title: 散点图 - Scatter
order: 2
---

`Scatter` 继承自 [Map](/zh/docs/api/point-maps/point-map)。

## 一、配置

创建地图实例：

```ts
import { Scatter } from '@antv/l7plot';
const scatter = new Scatter(container, options);
```

### container

`string|HTMLDivElement` required

地图渲染的 DOM 容器。

### options

`ScatterOptions` required

散点地图的所有配置项，继承自 [Map options](/zh/docs/api/map-api#options)。

### `options.`shape

`string` optional default: `'circle'`

散点形状，内置以下形状：

- circle: 圆形
- square: 正方形
- hexagon: 六边形
- triangle: 三角形
- pentagon: 五角星
- octogon: 八边形
- hexagram: 六边形
- rhombus: 菱形
- vesica: 椭圆形

```js
{
  shape: 'circle';
}
```

### `options.`size

`number` optional default: `5`

散点大小。

```js
{
  size: 5;
}
```

`markdown:docs/common/attribute/color.zh.md`

`markdown:docs/common/attribute/style.zh.md`

`markdown:docs/common/attribute/components.zh.md`

## 二、属性

继承 [Map 属性](/zh/docs/api/map-api#二、属性)。

### scatterLayer

`IBaseLayer`

散点图层实例。

### labelLayer

`undefined|IBaseLayer`

数据标签图层实例。

## 三、方法

继承 [Map 方法](/zh/docs/api/map-api#三、方法)。

## 四、事件

继承 [Map 方法](/zh/docs/api/map-api#四、事件)。

内置图层名称分别为：

- 'scatterLayer'
- 'labelLayer'

```js
scatter.on('scatterLayer:click', (e) => {});
```
