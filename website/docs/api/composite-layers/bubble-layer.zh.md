---
title: 气泡图层 - BubbleLayer
order: 0
---

<tag color="cyan" text="Composite Layer">Composite Layer</tag>

`BubbleLayer` 用于点数据图层展示，支持描边、文本标注、多选等功能。

## 一、配置

<embed src="@/docs/common/composite-layers/composite-common/options.zh.md"></embed>

<embed src="@/docs/common/base-layers/point-layer/source.zh.md"></embed>

### `options.`radius

`number|SizeStyleAttribute|Function` optional

气泡半径大小

```js
{ radius: 12, }
```

#### `radius.`field

`string` optional

半径大小值映射关联字段。

```js
{
  source: {
    data: [{ s: 12, t: 20, n: 'chengdu' }],
    // ...
  },
  radius: { field: 's' },
}
```

#### `radius.`value

`number|number[]|Function` optional

元素大小值映射值。

```js
{
  radius: {
    field: 't',
    value: ({ t }) => {
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
    field: 't',
    value: [12, 15],
    scale: { type: 'quantile' },
  }
}
```

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

<embed src="@/docs/common/attribute/scale.zh.md"></embed>

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

标签样式详细配置见 [TextLayerStyleOptions](/zh/docs/api/base-layers/text-layer#code-classlanguage-textoptionscodestyle)。

### `options.`state

`StateAttribute` optional

元素交互反馈效果。

#### `state.`active

`boolean｜BubbleLayerActiveOptions` optional default: `false`

标签 mousehover 高亮效果，开启 mousehover 元素高亮效果：

```js
{
  state: { active: true, }
}
```

开启 mousehover 元素高亮效果并自定义设置高亮颜色：

```js
{
  state: {
    active: {
      fillColor: false,
      strokeColor: '#2f54eb',
      lineWidth: 1.5,
      lineOpacity: 1,
    },
  }
}
```

BubbleLayerActiveOptions 配置如下：

| 属性        | 描述       | 类型            | 默认值      | 是否必填 |
| ----------- | ---------- | --------------- | ----------- | -------- |
| fillColor   | 填充颜色   | `false｜string` | `false`     | optional |
| strokeColor | 描边颜色   | `false｜string` | `'#2f54eb'` | optional |
| lineWidth   | 描边的宽度 | `number`        | `1.5`       | optional |
| lineOpacity | 描边透明度 | `number`        | `1`         | optional |

#### `state.`select

`boolean｜BubbleLayerActiveOptions` optional default: `false`

元素 mouseclick 选中高亮效果，开启 mouseclick 元素高亮效果：

```js
{
  state: { select: true, }
}
```

开启 mousehover 元素高亮效果并自定义设置高亮颜色：

```js
{
  state: {
    select: {
      fillColor: false,
      strokeColor: '#2f54eb',
      lineWidth: 1.5,
      lineOpacity: 1,
    }
  }
}
```

### `options.`enabledMultiSelect

`boolean` optional default: `false`

是否启用多选，开启后默认按 "Shift" 快捷键使用。

### `options.`triggerMultiSelectKey

`KeyboardEventKey` optional default: `"Shift"`

触发多选的快捷键，快捷键为 [KeyboardEventKey](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key) 类型，当为 `undefined` 时不需要快捷键触发多选。

## 二、属性

<embed src="@/docs/common/composite-layers/composite-common/attribute.zh.md"></embed>

## 三、方法

<embed src="@/docs/common/composite-layers/composite-common/method.zh.md"></embed>

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

<embed src="@/docs/common/composite-layers/composite-common/event.zh.md"></embed>

#### 选择事件

| 事件名   | 类型         | 描述                         |
| -------- | ------------ | ---------------------------- |
| select   | 选择事件     | 鼠标点击选中图层要素事件     |
| unselect | 取消选择事件 | 鼠标点击取消选中图层要素事件 |
