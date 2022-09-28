---
title: 区域图层 - ChoroplethLayer
order: 6
---

<tag color="cyan" text="Composite Layer">Composite Layer</tag>

`ChoroplethLayer` 用于面数据图层展示，支持描边、文本标注、多选等功能。

## 一、配置

`markdown:docs/common/composite-layers/composite-common/options.zh.md`

`markdown:docs/common/composite-layers/polygon-layer/source.zh.md`

### `options.`fillColor

`string|ColorStyleAttribute|Function` optional default: `'#5FD3A6'`

填充颜色。

```js
{ fillColor: 'red', }
```

#### `fillColor.`field

`string` optional

填充颜色值映射关联字段。

```js
{
  source: {
    data: [{ c: 'red', t: 20, n: 'chengdu' }],
    // ...
  },
  fillColor: { field: 'c', }
}
```

#### `fillColor.`value

`string|string[]|Function` optional

填充颜色值映射值。

```js
{
  fillColor: {
    field: 't',
    value: ({ t }) => {
      return t > 20 ? 'red': 'blue'
    }
  }
}
```

#### `fillColor.`scale

`markdown:docs/common/attribute/scale.zh.md`

```js
{
  fillColor: {
    field: 't',
    value: ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70'],
    scale: { type: 'quantile' }
  }
}
```

### `options.`opacity

`number` optional default: `1`

填充透明度。

### `options.`lineWidth

`number` optional default: `1`

描边线宽。

### `options.`strokeColor

`string` optional default: `#fff`

描边颜色。

### `options.`lineOpacity

`number` optional default: `1`

描边透明度。

### `options.`lineType

`‘solid’｜'dash'` optional default: `‘solid’`

描边线类型，支持实线与虚线。

### `options.`lineDash

`[number, number]` optional

描边的虚线间隔，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为 `[0,0]` 的效果为没有虚线。

### `options.`label

`TextLayerOptions` optional

标签标注。

#### `label.`field

`string` optional

标签值映射关联字段。

#### `label.`visible

`boolean` optional default: `true`

标签是否可见。

#### `label.`style

标签样式详细配置见 [TextLayerStyleOptions](/zh/docs/api/composite-layers/text-layer#code-classlanguage-textoptionscodestyle)。

`markdown:docs/common/composite-layers/choropleth-layer/state.zh.md`

<!-- 多选文档暂时不透出，后面改多选和单选并存交互 -->

<!-- ### `options.`enabledMultiSelect

`boolean` optional default: `false`

是否启用多选。 -->

## 二、属性

`markdown:docs/common/composite-layers/composite-common/attribute.zh.md`

## 三、方法

`markdown:docs/common/composite-layers/composite-common/method.zh.md`

### setActive

设置图层高亮状态。

```js
layer.setActive(field: string, value: number | string);
```

### setSelect

设置图层选中状态。

```js
layer.setSelect(field: string, value: number | string);
```

### boxSelect

图层框选数据。

```js
layer.boxSelect(bounds: [number, number, number, number], callback: (...args: any[]) => void);
```

## 四、事件

`markdown:docs/common/composite-layers/composite-common/event.zh.md`

#### 选择事件

| 事件名   | 类型         | 描述                         |
| -------- | ------------ | ---------------------------- |
| select   | 选择事件     | 鼠标点击选中图层要素事件     |
| unselect | 取消选择事件 | 鼠标点击取消选中图层要素事件 |
