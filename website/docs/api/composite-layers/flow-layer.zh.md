---
title: 客流聚合图层 - FlowLayer
order: 4
---

<Badge type="info" circleColor="cyan" text="Composite Layer">Composite Layer</Bdage>

`FlowLayer` 用于大数据量下，在地图不同层级下聚合展示客流的走向和权值信息。

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

### `options.`circleRadius

`number|SizeStyleAttribute|Function` optional default: `{ field: 'weight', value: [1, 16] }`

客流点半径大小

```js
{
  circleRadius: 12;
}
```

#### `circleRadius.`field

`string` optional

客流点半径大小值映射关联字段。

```js
{
  circleRadius: {
    field: 'weight',
    value: [1, 16]
  }
}
```

#### `circleRadius.`value

`number|number[]|Function` optional

客流点大小值映射值。

```js
{
  circleRadius: {
    field: 'weight',
    value: ({ weight }) => {
      return t > 20 ? 15 : 12
    }
  }
}
```

#### `circleRadius.`scale

<embed src="@/docs/common/attribute/scale.zh.md"></embed>

```js
{
  circleRadius: {
    field: 'weight',
    value: [12, 15],
    scale: { type: 'quantile' },
  }
}
```

### `options.`circleColor

`string|ColorStyleAttribute|Function` optional default: `'#fff'`

客流点填充颜色。

```js
{
  circleColor: 'red';
}
```

#### `circleColor.`field

`string` optional

客流点填充颜色值映射关联字段。

```js
{
  circleColor: {
    field: 'weight';
  }
}
```

#### `circleColor.`value

`string|string[]|Function` optional

客流点填充颜色值映射值。

```js
{
  circleColor: {
    field: 'weight',
    value: ({ weight }) => {
      return weight > 20 ? 'red': 'blue'
    }
  }
}
```

#### `circleColor.`scale

<embed src="@/docs/common/attribute/scale.zh.md"></embed>

```js
{
  circleColor: {
    field: 'weight',
    value: ['#B8E1FF', '#001D70'],
    scale: { type: 'linear' }
  }
}
```

### `options.`circleOpacity

`number|[string, (data: any) => number]` optional

客流点透明度

```js
{
  circleOpacity: 0.5;
}
```

### `options.`circleStrokeColor

`string` optional default: `'#000'`

客流点边框颜色

```js
{
  circleStrokeColor: '#000';
}
```

### `options.`circleStrokeWidth

`number` optional default: `1`

客流点边框宽度

```js
{
  circleStrokeWidth: 1;
}
```

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

客流线填充颜色。

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

客流线填充颜色值映射值。

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

### `options.`lineOpacity

`number` optional

客流线透明度

```js
{
  lineOpacity: 0.5;
}
```

### `options.`lineStroke

`string` optional default: `'#000'`

客流线边框颜色

```js
{
  lineStroke: '#000';
}
```

### `options.`lineStrokeWidth

`number` optional default: `1`

客流线边框宽度

```js
{
  lineStrokeWidth: 1;
}
```

### `options.`lineStrokeOpacity

`number` optional

客流线边框透明度

```js
{
  lineStrokeOpacity: 1;
}
```

### `options.`fadeOpacityEnabled

`boolean` optional default: `true`

客流线是否根据权重开启透明度渐变

### `options.`fadeOpacityAmount

`number` optional default: `0`

客流线透明度渐变权重

### `options.`showLocationName

`boolean` optional default: `false`

是否展示客流点的名称文本

### `options.`getClusterLocationName

`(clusterLocation: ClusterLocation, index: number) => Promise<string> | string` optional default: `undefined`

获取客流聚合点名称的方法，可接收 `Promise` 实例

### `options.`locationNameSize

`number|SizeStyleAttribute|Function` optional default: `{ field: 'weight', value: [1, 16] }`

客流点名称文本大小

```js
{
  locationNameSize: 12;
}
```

#### `locationNameSize.`field

`string` optional

客流点名称文本大小值映射关联字段。

```js
{
  locationNameSize: {
    field: 'weight',
    value: [1, 16]
  }
}
```

#### `locationNameSize.`value

`number|number[]|Function` optional

客流点名称文本大小值映射值。

```js
{
  locationNameSize: {
    field: 'weight',
    value: ({ weight }) => {
      return t > 20 ? 15 : 12
    }
  }
}
```

#### `locationNameSize.`scale

<embed src="@/docs/common/attribute/scale.zh.md"></embed>

```js
{
  locationNameSize: {
    field: 'weight',
    value: [12, 15],
    scale: { type: 'quantile' },
  }
}
```

### `options.`locationNameColor

`string|ColorStyleAttribute|Function` optional default: `'#fff'`

客流点名称文本填充颜色。

```js
{
  locationNameColor: 'red';
}
```

#### `locationNameColor.`field

`string` optional

客流点名称文本填充颜色值映射关联字段。

```js
{
  locationNameColor: {
    field: 'weight';
  }
}
```

#### `locationNameColor.`value

`string|string[]|Function` optional

客流点名称文本填充颜色值映射值。

```js
{
  locationNameColor: {
    field: 'weight',
    value: ({ weight }) => {
      return weight > 20 ? 'red': 'blue'
    }
  }
}
```

#### `locationNameColor.`scale

<embed src="@/docs/common/attribute/scale.zh.md"></embed>

```js
{
  locationNameColor: {
    field: 'weight',
    value: ['#B8E1FF', '#001D70'],
    scale: { type: 'linear' }
  }
}
```

### `options.`locationNameOffset

`[number, number]` optional

客流点名称文本位置偏移量

```js
{
  locationNameOffset: [0, 60];
}
```

### `options.`locationNameStroke

`string` optional default: `'#000'`

客流点名称文本描边颜色

```js
{
  locationNameStroke: '#000';
}
```

### `options.`locationNameStrokeWidth

`number` optional default: `1`

客流点名称文本描边宽度

```js
{
  locationNameStrokeWidth: 1;
}
```

### `options.`locationNameStrokeOpacity

`number` optional

客流点名称文本描边透明度

```js
{
  locationNameStrokeOpacity: 1;
}
```

### `options.`state

交互反馈。

#### `active`

`boolean | FLowLayerActiveOptions` optional

高亮交互

#### FLowLayerActiveOptions 配置如下：

| 属性               | 描述                         | 类型                                       | 默认值  | 是否必填 |
| ------------------ | ---------------------------- | ------------------------------------------ | ------- | -------- |
| enableCircleSpread | 是否自动高亮该其关联的客流线 | `boolean`                                  | `false` | optional |
| enableLineSpread   | 是否自动高亮该其关联的客流点 | `boolean`                                  | `false` | optional |
| circleColor        | 客流点颜色                   | `string｜PointLayerOptions['color'] `      | `-`     | optional |
| circleStrokeColor  | 客流点边框颜色               | `string｜PointLayerStyleOptions['stroke']` | `-`     | optional |
| lineColor          | 客流线填充颜色               | `string｜LineLayerOptions['color']`        | `-`     | optional |
| lineStroke         | 客流线边框颜色               | `string｜LineLayerStyleOptions['stroke']`  | `-`     | optional |

```js
// 关闭高亮交互
{
  state: {
    active: false;
  }
}
// 开启高亮交互
{
  state:{
    active:{
      enableCircleSpread: true,
      circleColor: '#2f54eb',
    }
  }
}
```

#### `select`

`boolean | FLowLayerActiveOptions` optional

选中交互

```js
// 关闭选中交互
{
  state: {
    active: false;
  }
}
// 开启高亮交互
{
  state:{
    active:{
      enableLineSpread: true,
      lineColor: '#2f54eb',
    }
  }
}
```

## 二、属性

<embed src="@/docs/common/composite-layers/composite-common/attribute.zh.md"></embed>

## 三、方法

<embed src="@/docs/common/composite-layers/composite-common/method.zh.md"></embed>

## 四、事件

<embed src="@/docs/common/composite-layers/composite-common/event.zh.md"></embed>

内置子图层名称分别为：

- circleLayer 客流点图层
- lineLayer 客流线图层

事件绑定示例

```ts
flowLayer.on('circleLayer:click', (e: MouseEvent) => void);
```
