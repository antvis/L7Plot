---
title: 散点图 - Dot
order: 0
---

`Dot` 继承基类 [Plot](/zh/docs/api/plot-api)。

## 一、配置

创建地图实例：

```ts
import { Dot } from '@antv/l7plot';
const dotMap = new Dot(container, options);
```

### container

`string|HTMLDivElement` required

地图渲染的 DOM 容器。

### options

`DotOptions` required

点地图的所有配置项，继承自 [Plot options](/zh/docs/api/plot-api#options)。

`markdown:docs/common/layers/dot-layer/shape.zh.md`

`markdown:docs/common/layers/dot-layer/color.zh.md`

`markdown:docs/common/layers/dot-layer/size.zh.md`

`markdown:docs/common/layers/dot-layer/style.zh.md`

`markdown:docs/common/attribute/state.zh.md`

`markdown:docs/common/layers/dot-layer/animate.zh.md`

`markdown:docs/common/attribute/components.zh.md`

## 二、属性

继承 [Plot 属性](/zh/docs/api/plot-api#二、属性)。

### dotLayer

`DotLayer`

点图层实例。

### labelLayer

`undefined|TextLayer`

数据标签图层实例。

## 三、方法

继承 [Plot 方法](/zh/docs/api/plot-api#三、方法)。

## 四、事件

继承 [Plot 方法](/zh/docs/api/plot-api#四、事件)。

内置图层名称分别为：

- dotLayer
- labelLayer

```js
dotMap.on('dotLayer:click', (e: MouseEvent) => void);
```
