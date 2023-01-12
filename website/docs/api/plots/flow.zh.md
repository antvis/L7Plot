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

### `options.`source

`SourceOptions` required

数据配置，详见 [Source](/zh/docs/api/source)。

```js
{
  source: {
    data: [{ startX: 58.00, startY: 32.84, endX: 85.7, endY: 25.161, c: 'red', t: 20, n: 'chengdu' }],
    parser: { type: 'json', x: 'startX', y: 'startY', x: 'endX', y: 'endY', }
  }
}
```

<embed src="@/docs/common/layers/arc-layer/shape.zh.md"></embed>

<embed src="@/docs/common/attribute/color.zh.md"></embed>

<embed src="@/docs/common/layers/arc-layer/size.zh.md"></embed>

<embed src="@/docs/common/layers/arc-layer/style.zh.md"></embed>

<embed src="@/docs/common/attribute/radiation.zh.md"></embed>

<embed src="@/docs/common/layers/lines-layer/animate.zh.md"></embed>

<embed src="@/docs/common/attribute/components.zh.md"></embed>

## 二、属性

继承 [Plot 属性](/zh/docs/api/plot-api#二、属性)。

### flowLayer

`ArcLayer`

弧线图层实例。

### labelLayer

`undefined|TextLayer`

数据标签图层实例。

## 三、方法

继承 [Plot 方法](/zh/docs/api/plot-api#三、方法)。

## 四、事件

继承 [Plot 方法](/zh/docs/api/plot-api#四、事件)。

内置图层名称分别为：

- flowLayer
- labelLayer

```js
pathMap.on('flowLayer:mousemove', (e: MouseEvent) => void);
```
