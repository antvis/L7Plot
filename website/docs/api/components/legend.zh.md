---
title: 图例 - Legend
order: 0
---

## `legend.`type

`'category'|'continue'` optional

图例类型，支持以下类型图例：

- 'category'：分类性图例
- 'continue'：连续性图例

## `legend.`position

`string` optional default: `'bottomleft'`

图例控件的位置，支持以下定位位置：

- 'topright'
- 'topleft'
- 'bottomright'
- 'bottomleft'

## `legend.`title

`string` optional default: `''`

图例标题内容。

## `legend.`className

`string` optional default: `''`

DOM 容器自定义 className 。

## `legend.`domStyles

`object` optional default: `{}`

自定义 legend 样式。

分类图例 CSS 样式自定义：

```ts
{
  domStyles: {
    'l7plot-legend__category'?: CSSProperties;
    'l7plot-legend__title'?: CSSProperties;
    'l7plot-legend__category-list'?: CSSProperties;
    'l7plot-legend__list-item'?: CSSProperties;
    'l7plot-legend__category-marker'?: CSSProperties;
    'l7plot-legend__category-value'?: CSSProperties;
  }
}
```

连续图例 CSS 样式自定义：

```ts
{
  domStyles: {
    'l7plot-legend__continue'?: CSSProperties;
    'l7plot-legend__title'?: CSSProperties;
    'l7plot-legend__ribbon'?: CSSProperties;
    'l7plot-legend__gradient-bar'?: CSSProperties;
    'l7plot-legend__value-range'?: CSSProperties;
  }
}
```

## `legend.`items

`CategoryLegendListItem[]` optional

适用于分类图例，自定义配置图例项的内容。_CategoryLegendListItem_ 配置如下：

| 参数名 | 类型   | 是否必选 | 默认值 | 描述             |
| ------ | ------ | -------- | ------ | ---------------- |
| id     | string | optional | -      | 唯一值，用于查找 |
| color  | string | required | -      | 颜色             |
| value  | any    | required | -      | 值               |

## `legend.`min

`number` optional

适用于连续图例，范围的最小值。

## `legend.`max

`number` optional

适用于连续图例，范围的最大值。

## `legend.`colors

`string[]` optional

适用于连续图例，自定义色带。

## `legend.`customContent

`CategoryLegendCustomContent|ContinueLegendCustomContent` optional

- 分类图例 _CategoryLegendCustomContent_: `(title: string, items: ILegendListItem[]) => stringHTML | HTMLElement`
- 连续图例 _ContinueLegendCustomContent_: `(title: string, min: number, max: number, colors: string[]) => stringHTML | HTMLElement`

自定义 legend 内容，注意是 `stringHTML | HTMLElemenct` [HTMLElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement) 或拼接好的 HTML 字符串，不是纯文本类型。

```js
customContent (title: string, items: ILegendListItem[]) {
  const container = document.createElement('div');
  container.innerHTML = '内容'
  return container;
}
```
