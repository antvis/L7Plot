---
title: 文本图层 - TextLayer
order: 1
---

`TextLayer` 继承基类 [PlotLayer](/zh/docs/api/layers/plot-layer)。

## 一、配置

### `options.`source

`SourceOptions` required

数据配置，详见 [Source](/zh/docs/api/source)。

```js
{
  source: {
    data: [{ lng: 104.101, lat: 30.649, c: 'red', t: 20, n: 'chengdu' }],
    parser: { type: 'json', x: 'lng', y: 'lat' }
  },
}
```

### `options.`field

`string` required

映射的标签数据字段。

### `options.`style

<embed src="@/docs/common/layers/text-layer/style.zh.md"></embed>

<embed src="@/docs/common/attribute/state.zh.md"></embed>

## 二、属性

继承 [PlotLayer 属性](/zh/docs/api/layers/plot-layer#二、属性)。

## 三、方法

继承 [PlotLayer 方法](/zh/docs/api/layers/plot-layer#三、方法)。

## 四、事件

继承 [PlotLayer 方法](/zh/docs/api/layers/plot-layer#四、事件)。
