---
title: 水晶体图层 - PrismLayer
order: 9
---

`PrismLayer` 继承 [PlotLayer](/zh/docs/api/layers/plot-layer)。

## 一、配置

<embed src="@/docs/common/layers/area-layer/source.zh.md"></embed>

<embed src="@/docs/common/attribute/color.zh.md"></embed>

### `options.`size

`number|object|Function` optional

水晶体高度。

```js
{ size: 120, }
```

#### `size.`field

`string` optional

水晶体高度值映射关联字段。

```js
{
  size: { field: 't' },
}
```

#### `size.`value

`number|number[]|Function` optional

水晶体高度值映射值。

```js
{
  size: {
    field: 't',
    value: ({ t }) => {
      return t > 20 ? 15 : 12
    }
  }
}
```

#### `size.`scale

<embed src="@/docs/common/attribute/scale.zh.md"></embed>

```js
{
  size: {
    field: 't',
    value: [120, 250],
    scale: { type: 'quantile' },
  }
}
```

### `options.`style

`PolygonLayerStyleOptions` optional

区域样式，PolygonLayerStyleOptions 配置如下：

| 属性    | 描述   | 类型     | 默认值 | 是否必填 |
| ------- | ------ | -------- | ------ | -------- |
| opacity | 透明度 | `number` | `1`    | optional |

```js
{
  style: {
    opacity: 0.8,
  }
}
```

<embed src="@/docs/common/attribute/state.zh.md"></embed>

## 二、属性

继承 [PlotLayer 属性](/zh/docs/api/layers/plot-layer#二、属性)。

## 三、方法

继承 [PlotLayer 方法](/zh/docs/api/layers/plot-layer#三、方法)。

## 四、事件

继承 [PlotLayer 方法](/zh/docs/api/layers/plot-layer#四、事件)。
