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
