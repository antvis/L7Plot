---
title: 轨迹图 - Trail
order: 6
---

`Trail` 继承基类 [Plot](/zh/docs/api/plot-api)。

## 一、配置

创建地图实例：

```ts
import { Trail } from '@antv/l7plot';
const trail = new Trail(container, options);
```

### container

`string|HTMLDivElement` required

地图渲染的 DOM 容器。

### options

`TrailOptions` required

蜂窝地图的所有配置项，继承自 [Plot options](/zh/docs/api/plot-api#options)。
