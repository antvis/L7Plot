---
title: 点云地图 - Point Cloud Map
order: 3
---

`PointCloudMap` 继承自 [PointMap](/zh/docs/api/point-maps/point-map)。

## 一、配置

创建地图实例：

```ts
import { PointCloudMap } from '@antv/l7plot';
const pointCloudMap = new PointCloudMap(container, options);
```

### container

`string|HTMLDivElement` required

地图渲染的 DOM 容器。

### options

`PointCloudMapOptions` required

点云地图的所有配置项，继承自 [PointMap options](/zh/docs/api/point-maps/point-map#options)。

### `options.`size

`number` optional default: `1`

点大小。

```js
{
  size: 0.5;
}
```

## 二、属性

继承 [Map 属性](/zh/docs/api/map-api#二、属性)。

### pointCloudLayer

`ILayer`

散点图层实例。

### labelLayer

`undefined|ILayer`

数据标签图层实例。

## 三、方法

继承 [Map 方法](/zh/docs/api/map-api#三、方法)。

## 四、事件

继承 [Map 方法](/zh/docs/api/map-api#四、事件)。

内置图层名称分别为：

- 'pointCloudLayer'
- 'labelLayer'

```js
pointCloudMap.on('pointCloudLayer:click', (e) => {});
// Or
pointCloudMap.pointCloudLayer.on('click', (e) => {});
```
