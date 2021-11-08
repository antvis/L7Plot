---
title: 行政区域分布图 - Choropleth
order: 9
---

`Choropleth` 继承基类 [Plot](/zh/docs/api/plot-api)。

## 一、配置

创建地图实例：

```ts
import { Choropleth } from '@antv/l7plot';
const choropleth = new Choropleth(container, options);
```

### container

`string|HTMLDivElement` required

地图渲染的 DOM 容器。

### options

`ChoroplethOptions` required

行政区域分布图的所有配置项，继承自 [Plot options](/zh/docs/api/plot-api#options)。

### `options.`geoArea

`string|GeoArea` required

行政地理数据地址，geoArea 配置如下：

| 属性 | 描述     | 类型                    | 默认值       | 是否必填 |
| ---- | -------- | ----------------------- | ------------ | -------- |
| url  | 数据地址 | `string`                |              | required |
| type | 数据类型 | `'geojson'｜'topojson'` | `'topojson'` | required |

> 行政地理数据地址默认值：https://gw.alipayobjects.com/os/alisis/geo-data-v0.1.0/choropleth-data, 不定时以更新其中版本号方式更新数据。

### `options.`source

`ChoroplethSourceOptions` required

行政地理数据地址，source 配置如下：

| 属性   | 描述           | 类型     | 默认值 | 是否必填 |
| ------ | -------------- | -------- | ------ | -------- |
| data   | 业务数据       | `Array`  |        | required |
| joinBy | 地理元数据关联 | `JoinBy` |        | required |

地理元数据关联，joinBy 配置如下：

| 属性        | 描述                             | 类型                | 默认值     | 是否必填 |
| ----------- | -------------------------------- | ------------------- | ---------- | -------- |
| sourceField | 业务元数据地理字段               | `string`            |            | required |
| geoField    | 地理数据字段                     | `string`            | `'adcode'` | optional |
| geoData     | 地理数据，设置则覆盖行政服务数据 | `FeatureCollection` |            | optional |

### `options.`viewLevel

`string|GeoArea` required

行政级别及范围配置，viewLevel 配置如下：

| 属性        | 描述                        | 类型                                                 | 默认值                    | 是否必填 |
| ----------- | --------------------------- | ---------------------------------------------------- | ------------------------- | -------- |
| level       | 初始化行政级别              | `'world'｜'country'｜'province'｜'city'｜'district'` |                           | required |
| adcode      | 初始化显示行政代码/行政名称 | `number｜string`                                     |                           | required |
| granularity | 化行政级别下的粒度          | `'country'｜'province'｜'city'｜'district'`          | 默认取值 level 下一个级别 | optional |

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
{
  source: {
    data: [{ name: '上海市', code: '310000', c: 'red', t: 20 }],
    joinBy: { sourceField: 'code', geoField: 'adcode' }
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

`markdown:docs/common/attribute/area-state.zh.md`

`markdown:docs/common/attribute/components.zh.md`

### `options.`chinaBorder

`boolean` optional default: `ture`

是否显示中国国界线。

### `options.`drill

`Drill` optional

数据钻取配置，drill 配置如下：

## 二、属性

继承 [Plot 属性](/zh/docs/api/plot-api#二、属性)。

### fillAreaLayer

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

- fillAreaLayer
- labelLayer

```js
choroplethMap.on('fillAreaLayer:click', (e: MouseEvent) => void);
```
