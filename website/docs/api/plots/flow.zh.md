---
title: 流向图 - Flow
order: 7
---

`Flow` 继承基类 [Plot](/zh/docs/api/plot-api)。

## 一、配置

创建地图实例：

```ts
import { Flow } from '@antv/l7plot';
const flowMap = new Flow(container, options);
```

### container

`string|HTMLDivElement` required

地图渲染的 DOM 容器。

### options

`FlowOptions` required

连接图的所有配置项，继承自 [Plot options](/zh/docs/api/plot-api#options)。

`markdown:docs/common/layers/arc-layer/shape.zh.md`

`markdown:docs/common/layers/arc-layer/color.zh.md`

`markdown:docs/common/layers/arc-layer/size.zh.md`

`markdown:docs/common/layers/arc-layer/style.zh.md`

`markdown:docs/common/attribute/radiation.zh.md`

`markdown:docs/common/layers/lines-layer/animate.zh.md`

`markdown:docs/common/attribute/components.zh.md`

## 二、属性

继承 [Plot 属性](/zh/docs/api/plot-api#二、属性)。

### flowLayer

`ArcLayer`

流向图层实例。

## 三、方法

继承 [Plot 方法](/zh/docs/api/plot-api#三、方法)。

## 四、事件

继承 [Plot 方法](/zh/docs/api/plot-api#四、事件)。

内置图层名称分别为：

- flowLayer

```js
pathMap.on('flowLayer:mousemove', (e: MouseEvent) => void);
```
