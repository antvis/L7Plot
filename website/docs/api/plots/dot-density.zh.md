---
title: 点密度图 - Dot Density
order: 2
---

`DotDensity` 继承自 [Plot](/zh/docs/api/plot-api)。

## 一、配置

创建地图实例：

```ts
import { DotDensity } from '@antv/l7plot';
const dotDensity = new DotDensity(container, options);
```

### container

`string|HTMLDivElement` required

地图渲染的 DOM 容器。

### options

`DotDensityOptions` required

点云地图的所有配置项，继承自 [Plot options](/zh/docs/api/plot-api#options)。

### `options.`size

`number` optional default: `1`

点大小。

```js
{
  size: 0.5;
}
```

`markdown:docs/common/attribute/color.zh.md`

`markdown:docs/common/attribute/style.zh.md`

`markdown:docs/common/attribute/components.zh.md`

## 二、属性

继承 [Plot 属性](/zh/docs/api/plot-api#二、属性)。

### dotDensityLayer

`PlotLayer`

散点图层实例。

### labelLayer

`undefined|PlotLayer`

数据标签图层实例。

## 三、方法

继承 [Plot 方法](/zh/docs/api/plot-api#三、方法)。

## 四、事件

继承 [Plot 方法](/zh/docs/api/plot-api#四、事件)。

内置图层名称分别为：

- dotDensityLayer
- labelLayer

```js
dotDensity.on('dotDensityLayer:click', (e: MouseEvent) => void);
```
