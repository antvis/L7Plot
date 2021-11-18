---
title: 蜂窝聚合图 - Hexbin
order: 5
---

`Hexbin` 继承基类 [Plot](/zh/docs/api/plot-api)。

## 一、配置

创建地图实例：

```ts
import { Hexbin } from '@antv/l7plot';
const hexbin = new Hexbin(container, options);
```

### container

`string|HTMLDivElement` required

地图渲染的 DOM 容器。

### options

`HexbinOptions` required

蜂窝地图的所有配置项，继承自 [Plot options](/zh/docs/api/plot-api#options)。

`markdown:docs/common/layers/grid-layer/source.zh.md`

`markdown:docs/common/layers/hexbin-layer/shape.zh.md`

`markdown:docs/common/layers/dot-layer/color.zh.md`

`markdown:docs/common/layers/grid-layer/size.zh.md`

`markdown:docs/common/layers/grid-layer/style.zh.md`

`markdown:docs/common/attribute/components.zh.md`

## 二、属性

继承 [Plot 属性](/zh/docs/api/plot-api#二、属性)。

### hexbinLayer

`HexbinLayer`

蜂窝图层实例。

### labelLayer

`undefined|HexbinLayer`

数据标签图层实例。

## 三、方法

继承 [Plot 方法](/zh/docs/api/plot-api#三、方法)。

## 四、事件

继承 [Plot 方法](/zh/docs/api/plot-api#四、事件)。

内置图层名称分别为：

- hexbinLayer
- labelLayer

```js
hexbin.on('hexbinLayer:click', (e: MouseEvent) => void);
```
