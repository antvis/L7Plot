---
title: 路径图 - Path
order: 6
---

`Path` 继承基类 [Plot](/zh/docs/api/plot-api)。

## 一、配置

创建地图实例：

```ts
import { Path } from '@antv/l7plot';
const path = new Path(container, options);
```

### container

`string|HTMLDivElement` required

地图渲染的 DOM 容器。

### options

`PathOptions` required

路径图的所有配置项，继承自 [Plot options](/zh/docs/api/plot-api#options)。

<embed src="@/docs/common/layers/path-layer/source.zh.md"></embed>

<embed src="@/docs/common/attribute/color.zh.md"></embed>

<embed src="@/docs/common/layers/path-layer/size.zh.md"></embed>

<embed src="@/docs/common/layers/path-layer/style.zh.md"></embed>

### `options.`tooltip

`false｜TooltipOptions` optional default: `false`

数据悬浮提示组件配置，详见 [Tooltip](/zh/docs/api/components/tooltip)。

### `options.`legend

`false｜LegendOptions` optional default: `false`

地图图例组件配置，详见 [Legend](/zh/docs/api/components/legend)。

### `options.`zoom

`false｜ZoomControlOptions` optional default: `false`

地图放大缩小控件，详见 [Zoom](/zh/docs/api/components/zoom)。

### `options.`scale

`false｜ScaleControlOptions` optional default: `false`

地图比例尺控件，详见 [Scale](/zh/docs/api/components/scale)。

### `options.`layerMenu

`false｜LayerMenuControlOptions` optional default: `false`

地图图层列表控件，详见 [LayerMenu](/zh/docs/api/components/layerMenu)。

## 二、属性

继承 [Plot 属性](/zh/docs/api/plot-api#二、属性)。

### pathLayer

`PathLayer`

路径图层实例。

## 三、方法

继承 [Plot 方法](/zh/docs/api/plot-api#三、方法)。

## 四、事件

继承 [Plot 方法](/zh/docs/api/plot-api#四、事件)。

内置图层名称分别为：

- pathLayer

```js
pathMap.on('pathLayer:click', (e: MouseEvent) => void);
```
