---
title: 图标图层 - IconLayer
order: 2
---

`IconLayer` 继承基类 [PlotLayer](/zh/docs/api/layers/plot-layer)。

## 一、配置

`markdown:docs/common/layers/dot-layer/source.zh.md`

### `options.`shape

`string` required

图标形状，使用方法如下：

1. 注册图标

```js
const images = [
  { id: '01', image: 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg' },
  { id: '02', image: 'https://gw.alipayobjects.com/zos/basement_prod/30580bc9-506f-4438-8c1a-744e082054ec.svg' },
  { id: '03', image: 'https://gw.alipayobjects.com/zos/basement_prod/7aa1f460-9f9f-499f-afdf-13424aa26bbf.svg' },
];
registerImages(images);
```

2. 使用注册图标

```js
{
  source: {
    data: [{ lng: 104.101, lat: 30.649, s: '01', t: 21,  n: 'chengdu' }],
    parser: { type: 'json', x: 'lng', y: 'lat' }
  },
  shape: '01',
}
```

自定义映射图标

```js
{
  shape: {
    field: 't',
    value: ({ t }) => {
      return t > 20 ? '01': '02'
    }
  }
}
```

`markdown:docs/common/attribute/color.zh.md`

`markdown:docs/common/layers/dot-layer/size.zh.md`

`markdown:docs/common/layers/dot-layer/style.zh.md`

`markdown:docs/common/attribute/state.zh.md`

## 二、属性

继承 [PlotLayer 属性](/zh/docs/api/layers/plot-layer#二、属性)。

## 三、方法

继承 [PlotLayer 方法](/zh/docs/api/layers/plot-layer#三、方法)。

## 四、事件

继承 [PlotLayer 方法](/zh/docs/api/layers/plot-layer#四、事件)。
