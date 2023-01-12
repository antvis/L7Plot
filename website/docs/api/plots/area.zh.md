---
title: 区域图 - Area
order: 8
---

`Area` 继承基类 [Plot](/zh/docs/api/plot-api)。

## 一、配置

创建地图实例：

```ts
import { Area } from '@antv/l7plot';
const area = new Area(container, options);
```

### container

`string|HTMLDivElement` required

地图渲染的 DOM 容器。

### options

`AreaOptions` required

区域图的所有配置项，继承自 [Plot options](/zh/docs/api/plot-api#options)。

<embed src="@/docs/common/layers/area-layer/source.zh.md"></embed>

<embed src="@/docs/common/attribute/color.zh.md"></embed>

<embed src="@/docs/common/layers/area-layer/style.zh.md"></embed>

### `options.`enabledMultiSelect

`boolean` optional default: `false`

是否启用多选。

<embed src="@/docs/common/layers/area-layer/state.zh.md"></embed>

<embed src="@/docs/common/attribute/components.zh.md"></embed>

## 二、属性

继承 [Plot 属性](/zh/docs/api/plot-api#二、属性)。

### areaLayer

`AreaLayer`

填充面图层实例。

### labelLayer

`undefined|TextLayer`

数据标签图层实例。

## 三、方法

继承 [Plot 方法](/zh/docs/api/plot-api#三、方法)。

## 四、事件

继承 [Plot 方法](/zh/docs/api/plot-api#四、事件)。

内置图层名称分别为：

- areaLayer
- labelLayer

```js
areaMap.on('areaLayer:click', (e: MouseEvent) => void);
```
