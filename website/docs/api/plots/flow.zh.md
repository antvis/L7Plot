---
title: 流向图 - Flow
order: 7
---

`Flow` 继承基类 [Plot](/zh/docs/api/plot-api)。

## 一、配置

创建地图实例：

```ts
import { Flow } from '@antv/l7plot';
const flowMap = new Flow(container, options);
```

### container

`string|HTMLDivElement` required

地图渲染的 DOM 容器。

### options

`FlowOptions` required

连接图的所有配置项，继承自 [Plot options](/zh/docs/api/plot-api#options)。

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
    data: [{ startX: 58.00, startY: 32.84, endX: 85.7, endY: 25.161, c: 'red', t: 20, n: 'chengdu' }],
    parser: { type: 'json', x: 'startX', y: 'startY', x: 'endX', y: 'endY', }
  },
  color: {
    fied: 'c'
  }
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

### `options.`size

`number|object|Function` optional default: `12`

元素大小。

```js
{
  size: 12,
}
```

#### `size.`field

`string` optional

元素大小值映射关联字段。

```js
{
  source: {
    data: [{ startX: 58.00, startY: 32.84, endX: 85.7, endY: 25.161, c: 'red', t: 20, n: 'chengdu' }],
    parser: { type: 'json', x: 'startX', y: 'startY', x: 'endX', y: 'endY', }
  },
  size: {
    fied: 's';
  }
}
```

#### `size.`value

`number|number[]|Function` optional

元素大小值映射值。

```js
{
  size: {
    fied: 't',
    value: ({ t }) => {
      return t > 20 ? 15 : 12
    }
  }
}
```

#### `size.`scale

`markdown:docs/common/attribute/scale.zh.md`

```js
{
  size: {
    fied: 't',
    value: [12, 15],
    scale: {type: 'quantile'}
  }
}
```

### `options.`style

`object` optional

全局样式。

```js
{
  style: {
    opacity: 0.8,
    lineType: 'dash',
    dashArray: [2, 2],
  }
}
```

#### `style.`opacity

`number` optional

线透明度。

#### `style.`lineType

`‘solid’｜'dash'` optional ‘solid’

线类型，支持实线与虚线。

#### `style.`dashArray

`[number, number]` optional

虚线间隔，虚线间隔，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为 `[0,0]` 的效果为没有虚线。

#### `style.`sourceColor

`string` optional

渐变起点颜色。

#### `style.`targetColor

`string` optional

渐变终点颜色。

### `options.`radiation

`object` optional

落地点辐射圈。

```js
{
  radiation: {
    color: 'yellow',
    size: 20,
  }
}
```

#### `radiation.`color

`string` optional

辐射圈颜色。

#### `radiation.`size

`number|object|Function` optional default: `20`

辐射圈大小。

`markdown:docs/common/attribute/path-components.zh.md`

## 二、属性

继承 [Plot 属性](/zh/docs/api/plot-api#二、属性)。

### flowLayer

`PlotLayer`

流向图层实例。

## 三、方法

继承 [Plot 方法](/zh/docs/api/plot-api#三、方法)。

## 四、事件

继承 [Plot 方法](/zh/docs/api/plot-api#四、事件)。

内置图层名称分别为：

- flowLayer

```js
pathMap.on('flowLayer:mousemove', (e: MouseEvent) => void);
```
