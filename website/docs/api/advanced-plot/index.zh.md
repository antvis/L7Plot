---
title: 高级图表 - Advanced Plot
order: 9
---

<Badge type="error">Unstable API</Badge>

`L7Plot` 是高级图表类，可以组合多个图层以及图表。

```js
constructor(container: string | HTMLDivElement, options: L7PlotOptions)
```

## 一、配置

### container

`string|HTMLDivElement` required

图表渲染的 DOM 容器。

### options

`L7PlotOptions` required

配置项。

### `options.`width

`number` optional default: `null`

设置容器宽度。

### `options.`height

`number` optional default: `null`

设置容器高度。

<embed src="@/docs/common/attribute/map.zh.md"></embed>

### `options.`antialias

`boolean` optional default: `true`

是否开启抗锯齿。

### `options.`preserveDrawingBuffer

`boolean` optional default: `false`

是否保留缓冲区数据。

### `options.`logo

`bool` optional default: `true`

是否显示 logo。

### `options.`layers

`LayerConfigType[]` optional default: `[]`

图层组配置，图层类型支持 L7Plot 内置的图层。

```js
{
  layers: [
    {
      name: 'myDotLayer',
      type: 'dotLayer',
      zIndex: 1,
      source: {
        data: data,
        parser: { type: 'json', x: 'lng', y: 'lat' },
      },
      color: '#ffed11',
      size: 40,
    },
    {
      name: 'myLabelLayer',
      type: 'textLayer',
      zIndex: 2,
      source: {
        data: data,
        parser: { type: 'json', x: 'lng', y: 'lat' },
      },
      field: 'name',
    },
  ],
}
```

### `options.`plots

`PlotConfigType[]` optional default: `[]`

图表组配置，图表类型支持 L7Plot 内置的图表。

```js
{
  plots: [
    {
      type: 'choropleth',
      zIndex: 1,
      source: {
        data: [],
        joinBy: {
          sourceField: 'code',
          geoField: 'adcode',
        },
      },
      viewLevel: {
        level: 'world',
        adcode: 'all',
      },
      autoFit: true,
    },
    {
      type: 'dot',
      zIndex: 2,
      source: {
        data: data,
        parser: { type: 'json', x: 'lng', y: 'lat' },
      },
      color: '#1AA9FF',
      tooltip: {
        items: ['name', 'value'],
      },
    },
  ],
}
```

### `options.`theme

`string|object` optional default: `'light'`

图表主题，详见 [Theme](/zh/docs/api/theme)。

<!-- ### `options.`tooltip

`false｜TooltipOptions` optional default: `false`

数据悬浮提示组件配置，详见 [Tooltip](/zh/docs/api/components/tooltip)。

### `options.`legend

`false｜LegendOptions` optional default: `false`

地图图例组件配置，详见 [Legend](/zh/docs/api/components/legend)。 -->

### `options.`zoom

`false｜ZoomControlOptions` optional default: `false`

地图放大缩小控件，详见 [Zoom](/zh/docs/api/components/zoom)。

### `options.`scale

`false｜ScaleControlOptions` optional default: `false`

地图比例尺控件，详见 [Scale](/zh/docs/api/components/scale)。

<!-- ### `options.`layerMenu

`false｜LayerMenuControlOptions` optional default: `false`

地图图层列表控件，详见 [LayerMenu](/zh/docs/api/components/layerMenu)。 -->

## 二、属性

### DefaultOptions

`object` **static**

### container

`HTMLDivElement`

渲染的 DOM 容器。

### options

`PlotOptions`

配置项。

### scene

`Scene`

地图场景实例。

### layerGroup

`LayerGroup`

图层组。

### sceneLoaded

`boolean`

地图场景是否加载完成。

### layersLoaded

`boolean`

图层是否加载完成。

### zoomControl

`undefined｜Zoom`

放缩器控件实例。

### scaleControl

`undefined｜Scale`

比例尺控件实例。

<!-- ### layerMenuControl

`undefined｜Layers`

图层列表控件实例。 -->

<!-- ### legendControl

`undefined｜Legend`

图例控件实例。 -->

<!-- ### tooltip

`undefined｜Tooltip`

悬浮提示组件实例。 -->

## 三、方法

<!-- ### update

更新配置且重新渲染。

```js
plot.update(options: Partial<PlotOptions>);
``` -->

### changeSize

修改容器大小。

```js
plot.changeSize(width: number, height: number);
```

### getScene

获取地图 scene 实例。

```js
plot.getScene() : Scene;
```

### getMap

获取 map 实例。

```js
plot.getMap() : MapboxInstance | AMapInstance;
```

### addLayer

添加图层。

```js
plot.addLayer(layer: LayerConfigType | IPlotLayer);
```

### getLayers

获取所有图层。

```js
plot.getLayers(): PlotLayer[];
```

### getLayerByName

根据图层名称获取图层。

```js
plot.getLayerByName(name: string): PlotLayer | undefined;
```

### removeLayer

移除图层。

```js
plot.removeLayer(layer: PlotLayer);
```

### removeLayerByName

根据图层名称移除图层。

```js
plot.removeLayerByName(name: string);
```

### removeAllLayer

移除容器内所有的图层。

```js
plot.removeAllLayer();
```

### addPlot

添加图表。

```js
plot.addPlot(plotConfig: PlotConfigType);
```

### getPlots

获取所有图表。

```js
plot.getPlots(): Plot[];
```

### getPlotByName

根据图表名称获取图表。

```js
plot.getPlotByName(name: string): Plot | undefined;
```

### removePlotByName

移除图表。

```js
plot.removePlotByName(name: string);
```

### removeAllPlot

移除容器内所有的图表。

```js
plot.removeAllPlot();
```

### zoomIn

地图放大一级。

```js
plot.zoomIn();
```

### zoomOut

地图缩小一级。

```js
plot.zoomOut();
```

### setPitch

设置地图倾角。

```js
plot.setPitch(pitch: number);
```

### fitBounds

设置地图缩放范围。

```js
plot.fitBounds(bound: Bounds);
```

### addZoomControl

添加地图缩放器控件。

```js
plot.addZoomControl(options: ZoomControlOptions);
```

### removeZoomControl

移除地图缩放器控件。

```js
plot.removeZoomControl();
```

### addScaleControl

添加地图比例尺控件。

```js
plot.addScaleControl(options: ScaleControlOptions);
```

### removeScaleControl

移除地图比例尺控件。

```js
plot.removeScaleControl();
```

<!-- ### addLayerMenuControl

添加地图图层列表控件。

```js
plot.addLayerMenuControl(options: LayerMenuControlOptions);
```

### removeLayerMenuControl

移除地图图层列表控件。

```js
plot.removeLayerMenuControl();
``` -->

<!-- ### addLegendControl

添加图例控件。

```js
plot.addLegendControl(options: LegendOptions);
```

### removeLegendControl

移除图例控件。

```js
plot.removeLegendControl();
``` -->

### exportPng

```js
plot.exportPng(type?: 'png' | 'jpg');
```

### on

绑定事件。

```js
plot.on(event: string, callback: Function);
```

### once

绑定一次事件。

```js
plot.once(event: string, callback: Function);
```

### off

解绑事件。

```js
plot.off(event: string, callback: Function);
```

### destroy

```js
plot.destroy();
```

## 四、事件

### 事件监听

#### 绑定事件

```js
plot.on(event: string, callback: Function);
```

#### 绑定一次事件

```js
plot.once(event: string, callback: Function);
```

#### 解绑事件

```js
plot.off(event: string, callback: Function);
```
