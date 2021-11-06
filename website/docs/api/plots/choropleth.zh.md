---
title: 行政区域分布图 - Choropleth
order: 9
---

`Choropleth` 继承基类 [Plot](/zh/docs/api/plot-api)。

## 一、配置

创建地图实例：

```ts
import { Choropleth } from '@antv/l7plot';
const choropleth = new Choropleth(container, options);
```

### container

`string|HTMLDivElement` required

地图渲染的 DOM 容器。

### options

`ChoroplethOptions` required

蜂窝地图的所有配置项，继承自 [Plot options](/zh/docs/api/plot-api#options)。
