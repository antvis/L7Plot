---
title: 字体标注图层 - IconFontLayer
order: 2
---

<Badge type="info" color="cyan" text="Composite Layer">Composite Layer</Bdage>

`IconFontLayer` 字体 iconfont 标注图层。

## 一、配置

<embed src="@/docs/common/composite-layers/composite-common/options.zh.md"></embed>

<embed src="@/docs/common/base-layers/point-layer/source.zh.md"></embed>

### `options.`radius

`number|SizeStyleAttribute|Function` optional

标注半径大小

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

### `options.`icon

`string|ShapeStyleAttribute|Function` optional

映射字体图标。

```js
{ icon: { field: 'n', value: 'text', }, }
```

#### `icon.`field

`string` optional

图标映射关联字段。

#### `icon.`value

`string|string[]|Function` optional
映射图标类型

```js
{
  icon: {
    field: 't',
    value: ['a','b','c']
  }
}
```

#### `icon.`scale

icon scale 通常使用枚举类型 cat scale

<embed src="@/docs/common/attribute/scale.zh.md"></embed>

```js
{
  icon: {
    field: 'name',
    value: ['icon1', 'icon'],
    scale: { type: 'cat' },
  }
}
```

### `options.`iconStyle

标注样式和文字标注一致

<embed src="@/docs/common/base-layers/text-layer/style.zh.md"></embed>

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

`boolean｜Pick<IconLayerActiveOptions, 'enable' | 'color'>` optional default: `false`

标签 mousehover 高亮效果，开启 mousehover 元素高亮效果：

```js
{
  state: { active: true, }
}
```

开启 mousehover 元素高亮效果并自定义设置高亮颜色：

```js
{
  state: { active: { color: 'red', enable: true }, }
}
```

#### `state.`select

`boolean｜IconLayerActiveOptions` optional default: `false`

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
    select: { radius: 10, opacity: 1,}
  }
}
```

IconLayerActiveOptions 配置如下：

| 属性    | 描述       | 类型        | 默认值    | 是否必填 |
| ------- | ---------- | ----------- | --------- | -------- |
| enable  | 是否开启   | `boolean`   | `false`   | optional |
| icon    | 高亮图标名 | `ShapeAttr` |           | optional |
| radius  | 图标大小   | `number`    | `10`      | optional |
| color   | 图标颜色   | `string`    | `#2f54eb` | optional |
| opacity | 图标透明度 | `number`    | `1`       | optional |

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

### addIconAtlas

添加 Icon 图标资源，也可使用 `scene.addImage()` 方法

```js
layer.addIconAtlas(iconAtlas: { [key: string]: string }[])

```

## 四、事件

<embed src="@/docs/common/composite-layers/composite-common/event.zh.md"></embed>

#### 选择事件

| 事件名   | 类型         | 描述                         |
| -------- | ------------ | ---------------------------- |
| select   | 选择事件     | 鼠标点击选中图层要素事件     |
| unselect | 取消选择事件 | 鼠标点击取消选中图层要素事件 |
