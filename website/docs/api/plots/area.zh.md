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

蜂窝地图的所有配置项，继承自 [Plot options](/zh/docs/api/plot-api#options)。
