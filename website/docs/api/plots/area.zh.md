---
title: 区域图 - Area
order: 8
---

`Area` 继承基类 [Plot](/zh/docs/api/plot-api)。

## 一、配置

创建地图实例：

```ts
import { Area } from '@antv/l7plot';
const area = new Area(container, options);
```

### container

`string|HTMLDivElement` required

地图渲染的 DOM 容器。

### options

`AreaOptions` required

区域图的所有配置项，继承自 [Plot options](/zh/docs/api/plot-api#options)。

### `options.`color

`string|object|Function` optional default: `'#5FD3A6'`

元素颜色。

```js
{
  color: 'red',
}
```

#### `color.`field

`string` optional

元素颜色值映射关联字段。

```js
const data = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: '上海市', code: '310000', c: 'red', t: 20 },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [115.1806640625, 30.637912028341123],
            [114.9609375, 29.152161283318915],
            [117.79541015625001, 27.430289738862594],
            [118.740234375, 29.420460341013133],
            [117.46582031249999, 31.50362930577303],
            [115.1806640625, 30.637912028341123],
          ],
        ],
      },
    },
  ],
};
```

```js
{
  source: {
    data,
    parser: { type: 'geojson' }
  },
  color: { fied: 'c' }
}
```

#### `color.`value

`string|string[]|Function` optional

元素颜色值映射值。

```js
{
  color: {
    fied: 't',
    value: ({ t }) => {
      return t > 20 ? 'red': 'blue'
    }
  }
}
```

#### `color.`scale

`markdown:docs/common/attribute/scale.zh.md`

```js
{
  color: {
    fied: 't',
    value: ['blue', 'red'],
    scale: {type: 'quantile'}
  }
}
```

`markdown:docs/common/attribute/area-style.zh.md`

### `options.`enabledMultiSelect

`boolean` optional default: `false`

是否启用多选。

`markdown:docs/common/attribute/area-state.zh.md`

`markdown:docs/common/attribute/components.zh.md`

## 二、属性

继承 [Plot 属性](/zh/docs/api/plot-api#二、属性)。

### areaLayer

`PlotLayer`

填充面图层实例。

### labelLayer

`undefined|PlotLayer`

数据标签图层实例。

## 三、方法

继承 [Plot 方法](/zh/docs/api/plot-api#三、方法)。

## 四、事件

继承 [Plot 方法](/zh/docs/api/plot-api#四、事件)。

内置图层名称分别为：

- areaLayer
- labelLayer

```js
areaMap.on('areaLayer:click', (e: MouseEvent) => void);
```
