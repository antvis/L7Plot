---
title: 数据标签 - Label
order: 3
---

## `label.`field

`string` required

映射的标签数据字段。

<!-- ## `label.`content

`string` optional default: `''`

标签文本内容。 -->

## `label.`style

<embed src="@/docs/common/layers/text-layer/style.zh.md"></embed>

## `label.`state

`IStateAttribute` optional

标签交互反馈效果。

### `state.`active

`boolean｜IActiveOption` optional default: `false`

标签 mousehover 高亮效果，开启 mousehover 标签高亮效果：

```js
{
  state: { active: true, }
}
```

开启 mousehover 标签高亮效果并自定义设置高亮颜色：

```js
{
  state: {
    active: { color: 'red', }
  }
}
```

### `state.`select

`boolean｜IActiveOption` optional default: `false`

标签 mouseclick 选中高亮效果，开启 mouseclick 标签高亮效果：

```js
{
  state: { select: true, }
}
```

开启 mousehover 标签高亮效果并自定义设置高亮颜色：

```js
{
  state: {
    select: { color: 'red', }
  }
}
```
