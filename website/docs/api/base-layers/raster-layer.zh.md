---
title: 栅格图层 - RasterLayer
order: 7
---

<tag color="blue" text="Core Layer">Core Layer</tag>

`RasterLayer` 是基于 [L7-RasterLayer](https://l7.antv.vision/zh/docs/api/raster/raster_layer) 封装的配置式 API。

```ts
new RasterLayer(options: RasterLayerOptions)
```

## 一、配置

### `options.`name

`string` optional

图层名。

### `options.`id

`string` optional

图层 ID。

### `options.`zIndex

`number` optional default: `0`

图层层叠顺序，数值越大，图层层叠最高。

### `options.`visible

`boolean` optional default: `true`

图层是否可见。

### `options.`minZoom

`number` optional

图层可见最小缩放层级。

### `options.`maxZoom

`number` optional

图层可见最大缩放层级。

### `options.`autoFit

`boolean` optional default: `false`

图层加载成功后是否自动定位到图层数据可见范围，注意 <tag color="red" text="开启"></tag>后图层数据发生更新时，地图也会自动缩放到图层的数据边界范围。

### `options.`blend

`string` optional default: `normal`

图层的元素混合效果，支持以下效果：

- normal：正常效果，默认效果
- additive：叠加模式
- subtractive：相减模式
- max：最大值

<embed src="@/docs/common/base-layers/raster-layer/source.zh.md"></embed>

<embed src="@/docs/common/base-layers/raster-layer/style.zh.md"></embed>

## 二、属性

<embed src="@/docs/common/base-layers/base-common/attribute.zh.md"></embed>

## 三、方法

<embed src="@/docs/common/base-layers/base-common/method.zh.md"></embed>

## 四、事件

<embed src="@/docs/common/base-layers/base-common/event.zh.md"></embed>
