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

`markdown:docs/common/attribute/path-color.zh.md`

`markdown:docs/common/attribute/path-size.zh.md`

`markdown:docs/common/attribute/path-style.zh.md`

`markdown:docs/common/attribute/path-components.zh.md`

## 二、属性

继承 [Plot 属性](/zh/docs/api/plot-api#二、属性)。

### pathLayer

`PlotLayer`

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
