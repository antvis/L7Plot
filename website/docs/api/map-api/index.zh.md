---
title: 地图 - Map
order: 0
redirect_from:
  - /zh/docs/api
---

## 一、配置项

创建地图实例

```ts
import { BubbleMap } from '@antv/l7plot';
const bubbleMap = new BubbleMap(container, options);
```

### container

`string | HTMLDivElement` required

地图渲染的 DOM 容器

### options

`MapOptions`

当前地图的所有配置项 options。

### `options.`map

#### `map.`type

`string` optional default: `'amap'`

地图类型

- amap: 高德地图
- mapbox: Mapbox 地图

#### `map.`token

`string` required

地图服务 token

#### `map.`center

`number[]` optional default: `[0, 0]`

地图初始中心经纬度

#### `map.`pitch

`number` optional default: `0`

地图初始倾角

#### `map.`rotation

`number` optional default: `0`

地图初始旋转角度

#### `map.`zoom

`number` optional default: `0`

地图初始缩放层级

- Mapbox （0-24）
- 高德 （2-19）

#### `map.`minZoom

`number` optional default: `0`

最小缩放等级

#### `map.`maxZoom

`number` optional default: `22`

最大缩放等级

#### `map.`style

`string` optional default: `light`

内置样式:

- dark
- light
- normal
- blank: 无底图

自定义样式:

```json
{
  style: 'amap://styles/2a09079c3daac9420ee53b67307a8006?isPublic=true';
}
```

### 交互设置

## 二、属性

## 三、方法

### update

```sign
map.update(options: Partial<MapOptions>);
```

### changeData

```sign
map.changeData(data: any, cfg?: ISourceCFG);
```

### on

```sign
map.on(event: string, callback: Function);
```

### once

```sign
map.once(event: string, callback: Function);
```

### off

```sign
map.off(event?: string, callback?: Function);
```

### exportPng

```sign
map.exportPng(type?: 'png' | 'jpg');
```

### destroy

```sign
map.destroy();
```

## 四、事件

### 事件监听

#### on

```sign
map.on(event: string, callback: Function);
```

#### once

```sign
map.once(event: string, callback: Function);
```

#### off

```sign
map.off(event?: string, callback?: Function);
```

### 事件类别

#### 地图事件

#### 图层事件

#### 组件事件

## 五、资源注册
