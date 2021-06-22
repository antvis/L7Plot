---
title: 地图 API
order: 0
redirect_from:
  - /zh/docs/api
---

# 一、通用 API

简单的使用示例：

```ts
import { BubbleMap,  } from '@antv/l7plot';
const bubbleMap = new BubbleMap('#container', {
  // ..config
});
图表配置结构：
interface IMapConfig extends Omit<MapConfig, 'id'> {
  mapType?: 'amap' | 'mapbox';
}
interface IStatusOptions {
  resizeEnable: boolean;
  dragEnable: boolean;
  keyboardEnable: boolean;
  doubleClickZoom: boolean;
  zoomEnable: boolean;
  rotateEnable: boolean;
}
interface MapOptions {
  width?: Number | String
  height?: Number | String
  mapConfig?: IMapConfig
  data: any
  controller?: boolean | IStatusOptions
  label?: false | ILabel
  color？string | string[] | Function
  popup?: false | IPopup
  theme?: string | Record<string, unknown>
  legend?: false | ILegendControlOption
  scale?: false | IScaleControlOption;
    zoom?: false | IZoomControlOption;
  layerMenu?: false | ILayerMenuControlOption;
}
```

## 二、图表分类
