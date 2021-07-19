---
title: 悬浮提示 - Tooltip
order: 4
---

## `tooltip.`title

`string` optional default: `''`

tooltip 标题内容。

## `tooltip.`customTitle

`Function: (data: any) => string` optional

自定义 tooltip 标题内容。

## `tooltip.`showTitle

`boolean` optional default: `true`

是否显示标题。

## `tooltip.`trigger

`string` optional default: `'mousemove'`

触发图层事件显示 tooltip ，有以下触发事件方式：

- mousemove
- click

## `tooltip.`items

`string[]｜ITooltipItem` optional default: `[]`

tooltip 显示内容关联字段。

### `items.`field

`string` required

关联字段。

### `items.`alias

`string` optional default: `''`

关联字段别名。

### `items.`customValue

`Function: (value: any, data: any) => any` optional

自定义关联字取值。

## `tooltip.`className

`string` optional default: `''`

tooltip 自定义 className 。

## `tooltip.`anchor

`string` optional default: `'top-left'`

tooltip 相对锚点的位置，支持以下相对锚点的位置：

- 'center'
- 'top'
- 'top-left'
- 'top-right'
- 'bottom'
- 'bottom-left'
- 'left'
- 'right'

## `tooltip.`offsets

`number[]` optional default: `[15, 0]`

tooltip 相对锚点的偏移量。

## `tooltip.`offsets

`number[]` optional default: `[15, 0]`

tooltip 相对锚点的偏移量。

## `tooltip.`customContent

`Function: (title: string, items: ITooltipListItem[]) => string|HTMLElement` optional

自定义 tooltip 内容。

## `tooltip.`domStyles

`object` optional default: `{}`

自定义 tooltip 样式。
