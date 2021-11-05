---
title: 弧线图 - Arc
order: 7
---

`Arc` 继承基类 [Plot](/zh/docs/api/plot-api)。

## 一、配置

创建地图实例：

```ts
import { Arc } from '@antv/l7plot';
const arc = new Arc(container, options);
```

### container

`string|HTMLDivElement` required

地图渲染的 DOM 容器。

### options

`ArcOptions` required

蜂窝地图的所有配置项，继承自 [Plot options](/zh/docs/api/plot-api#options)。
