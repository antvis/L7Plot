---
title: 弧线图层 - ArcLayer
order: 7
---

`ArcLayer` 继承 [PlotLayer](/zh/docs/api/layers/plot-layer)。

## 一、配置

### `options.`source

`SourceOptions` required

数据配置，详见 [Source](/zh/docs/api/source)。

```js
{
  source: {
    data: [{ startX: 58.00, startY: 32.84, endX: 85.7, endY: 25.161, c: 'red', t: 20, n: 'chengdu' }],
    parser: { type: 'json', x: 'startX', y: 'startY', x: 'endX', y: 'endY', }
  }
}
```

`markdown:docs/common/layers/arc-layer/shape.zh.md`

`markdown:docs/common/attribute/color.zh.md`

`markdown:docs/common/layers/arc-layer/size.zh.md`

`markdown:docs/common/layers/arc-layer/style.zh.md`

`markdown:docs/common/layers/lines-layer/animate.zh.md`

## 二、属性

继承 [PlotLayer 属性](/zh/docs/api/layers/plot-layer#二、属性)。

## 三、方法

继承 [PlotLayer 方法](/zh/docs/api/layers/plot-layer#三、方法)。

## 四、事件

继承 [PlotLayer 方法](/zh/docs/api/layers/plot-layer#四、事件)。
