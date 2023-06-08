---
title: 客流聚合图层 - TrafficFlowLayer
order: 4
---

<Badge type="info" color="cyan" text="Composite Layer">Composite Layer</Bdage>

`TrafficFlowLayer` 用于大数据量下，在地图不同层级下聚合展示客流的走向和权值信息。

## 一、配置

<embed src="@/docs/common/composite-layers/composite-common/options.zh.md"></embed>

### `options.`source

`SourceOptions` required

**注意**，客流聚合图层的 `source` 仅支持以下这一种配置形式:

```ts
{
  source: {
    data: [
      {
        weight: 5501,
        f_lon: 121.5838545,
        f_lat: 31.14749588,
        t_lon: 121.6664482,
        t_lat: 31.14343923
      },
      // ...
    ],
    parser: {
      type: 'json',
      x: 'f_lon',
      y: 'f_lat',
      x1: 't_lon',
      y1: 't_lat',
      weight: 'weight',
    }
  },
}
```

### `options.`radius

`number|SizeStyleAttribute|Function` optional

客流点半径大小

```js
{
  radius: 12;
}
```

#### `radius.`field

`string` optional

客流点半径大小值映射关联字段。

```js
{
  radius: {
    field: 'weight',
    value: [1, 16]
  }
}
```

#### `radius.`value

`number|number[]|Function` optional

客流点大小值映射值。

```js
{
  radius: {
    field: 'weight',
    value: ({ weight }) => {
      return t > 20 ? 15 : 12
    }
  }
}
```

#### `radius.`scale

<embed src="@/docs/common/attribute/scale.zh.md"></embed>

```js
{
  radius: {
    field: 'weight',
    value: [12, 15],
    scale: { type: 'quantile' },
  }
}
```

### `options.`color

`string|ColorStyleAttribute|Function` optional default: `'#5FD3A6'`

客流点填充颜色。

```js
{
  color: 'red';
}
```

#### `color.`field

`string` optional

客流点填充颜色值映射关联字段。

```js
{
  color: {
    field: 'weight';
  }
}
```

#### `color.`value

`string|string[]|Function` optional

客流点填充颜色值映射值。

```js
{
  color: {
    field: 'weight',
    value: ({ weight }) => {
      return weight > 20 ? 'red': 'blue'
    }
  }
}
```

#### `color.`scale

<embed src="@/docs/common/attribute/scale.zh.md"></embed>

```js
{
  color: {
    field: 'weight',
    value: ['#B8E1FF', '#001D70'],
    scale: { type: 'linear' }
  }
}
```

<embed src="@/docs/common/base-layers/point-layer/style.zh.md"></embed>

### `options.`lineWidth

`number|SizeStyleAttribute|Function` optional

客流线宽度大小

```js
{
  lineWidth: 12;
}
```

#### `lineWidth.`field

`string` optional

客流线宽度大小值映射关联字段。

```js
{
  source: {
    data: [
      {
        weight: 5501,
        f_lon: 121.5838545,
        f_lat: 31.14749588,
        t_lon: 121.6664482,
        t_lat: 31.14343923
      },
      // ...
    ],
      parser: {
      type: 'json',
        x: 'f_lon',
        y: 'f_lat',
        x1: 't_lon',
        y1: 't_lat',
        weight: 'weight',
    }
  },
  lineWidth: {
    field: 'weight',
    value: [1, 16]
  }
}
```

#### `lineWidth.`value

`number|number[]|Function` optional

客流线宽度大小值映射值。

```js
{
  lineWidth: {
    field: 'weight',
    value: ({ weight }) => {
      return t > 20 ? 15 : 12
    }
  }
}
```

#### `lineWidth.`scale

<embed src="@/docs/common/attribute/scale.zh.md"></embed>

```js
{
  lineWidth: {
    field: 'weight',
    value: [12, 15],
    scale: { type: 'quantile' },
  }
}
```

### `options.`lineColor

`string|LineColorStyleAttribute|Function` optional default: `'#5FD3A6'`

客流点填充颜色。

```js
{
  lineColor: 'red';
}
```

#### `lineColor.`field

`string` optional

客流点填充颜色值映射关联字段。

```js
{
  lineColor: {
    field: 'weight';
  }
}
```

#### `lineColor.`value

`string|string[]|Function` optional

客流点填充颜色值映射值。

```js
{
  lineColor: {
    field: 'weight',
    value: ({ weight }) => {
      return weight > 20 ? 'red': 'blue'
    }
  }
}
```

#### `lineColor.`scale

<embed src="@/docs/common/attribute/scale.zh.md"></embed>

```js
{
  lineColor: {
    field: 'weight',
    value: ['#B8E1FF', '#001D70'],
    scale: { type: 'linear' }
  }
}
```

### options.lineStyle

`LineLayerStyleOptions` optional

客流线样式，LineLayerStyleOptions 配置如下：

| 属性        | 描述                   | 类型               | 默认值  | 是否必填 |
| ----------- | ---------------------- | ------------------ | ------- | -------- |
| opacity     | 透明度                 | `number`           | `1`     | optional |
| lineType    | 线类型，支持实线与虚线 | `‘solid’｜'dash'`  | ‘solid’ | optional |
| dashArray   | 虚线间隔               | `[number, number]` |         | optional |
| sourceColor | 渐变起点颜色           | `string`           |         | optional |
| targetColor | 渐变终点颜色           | `string`           |         | optional |

> dashArray: 虚线间隔，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。dashArray 设为 `[0,0]` 的效果为没有虚线。

```js
{
  style: {
    opacity: 0.8,
    lineType: 'dash',
    dashArray: [2, 2],
  }
}
```

### options.fadeOpacityEnabled

`boolean` optional default: `true`

客流线是否根据权重开启透明度渐变

### options.fadeOpacityAmount

`number` optional default: `0`

客流线透明度渐变权重

## 二、属性

<embed src="@/docs/common/composite-layers/composite-common/attribute.zh.md"></embed>

## 三、方法

<embed src="@/docs/common/composite-layers/composite-common/method.zh.md"></embed>
