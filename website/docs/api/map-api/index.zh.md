---
title: 地图 - Map
order: 0
redirect_from:
  - /zh/docs/api
---

`Map` 是所有地图的基类，定义了地图的通用属性和方法。

## 一、配置

```ts
constructor(container: string | HTMLDivElement, options: MapOptions)
```

### container

`string|HTMLDivElement` required

地图渲染的 DOM 容器。

### options

`MapOptions` required

地图的所有配置项。

### `options.`width

`number` optional default: `null`

设置地图容器宽度。

### `options.`height

`number` optional default: `null`

设置地图容器高度。

### `options.`map

`MapConfig` required

地图容器配置项。

#### `map.`type

`string` optional default: `'amap'`

地图类型，支持以下两种类型：

- amap: 高德地图
- mapbox: Mapbox 地图

#### `map.`token

`string` required

地图服务 token。

#### `map.`center

`number[]` optional default: `[0, 0]`

初始中心经纬度。

#### `map.`pitch

`number` optional default: `0`

初始倾角。

#### `map.`rotation

`number` optional default: `0`

初始旋转角度。

#### `map.`zoom

`number` optional default: `0`

初始缩放层级，底图可缩放层级分布为：

- Mapbox （0-24）
- 高德 （2-19）

#### `map.`minZoom

`number` optional default: `0`

地图最小缩放等级。

#### `map.`maxZoom

`number` optional default: `22`

地图最大缩放等级

#### `map.`style

`string` optional default: `dark`

内置样式:

- dark: 黑暗
- light: 明亮
- normal: 普通
- blank: 无底图

自定义样式:

```js
{
  style: 'amap://styles/2a09079c3daac9420ee53b67307a8006?isPublic=true';
}
```

### `options.`logo

`bool` optional default: `true`

是否显示 logo。

### `options.`source

`ISource` required

数据配置，详见 [Source](/zh/docs/api/source)。

### `options.`autoFit

`bool` optional default: `false`

图层完成初始化之后，地图是否自动缩放到图层的数据边界范围。

### `options.`state

`IStateAttribute` optional

元素交互反馈效果。

#### `options.`active

`boolean｜IActiveOption` optional default: `false`

标签 mousehover 高亮效果，开启 mousehover 元素高亮效果：

```js
{
  state: {
    active: true;
  }
}
```

开启 mousehover 元素高亮效果并自定义设置高亮颜色：

```js
{
  state: {
    active: {
      color: 'red';
    }
  }
}
```

#### `options.`select

`boolean｜IActiveOption` optional default: `false`

元素 mouseclick 选中高亮效果，开启 mouseclick 元素高亮效果：

```js
{
  state: {
    select: true;
  }
}
```

开启 mousehover 元素高亮效果并自定义设置高亮颜色：

```js
{
  state: {
    select: {
      color: 'red';
    }
  }
}
```

`markdown:docs/common/attribute/components.zh.md`

## 二、属性

### DefaultOptions

`Object` **static**

### container

`HTMLDivElement`

当前地图渲染的 DOM 容器。

### options

`MapOptions`

当前地图的所有配置项。

### scene

`Scene`

当前地图的场景实例。

### type

`string`

当前地图所属类型。

### layerGroup

`LayerGroup`

当前地图的图层组。

### sceneLoaded

`boolean`

当前地图的场景是否加载完成。

### layersLoaded

`boolean`

当前地图的图层是否加载完成。

### zoomControl

`undefined｜Zoom`

放缩器控件实例。

### scaleControl

`undefined｜Scale`

比例尺控件实例。

### layerMenuControl

`undefined｜Layers`

图层列表控件实例。

### legendControl

`undefined｜Legend`

图例控件实例。

### tooltip

`undefined｜Tooltip`

悬浮提示组件实例。

## 三、方法

### update

更新配置且重新渲染。

```ts
map.update(options: Partial<MapOptions>);
```

### changeData

更新数据源。

```ts
map.changeData(data: any, cfg?: ISourceCFG);
```

### changeSize

修改容器大小。

```ts
map.changeSize(width: number, height: number);
```

### getScene

获取 scene 实例。

```ts
map.getScene() : Scene;
```

### getMap

获取 map 实例。

```ts
map.getMap() : MapboxInstance | AMapInstance;
```

### addLayer

添加图层。

```ts
map.addLayer(layer: ILayer);
```

### getLayes

获取所有图层。

```ts
map.getLayes(): ILayer[];
```

### getLayerByName

根据图层名称获取图层。

```ts
map.getLayes(name: string): ILayer | undefined;
```

### removeLayer

移除图层。

```ts
map.removeLayer(layer: ILayer);
```

### removeAllLayer

移除容器内所有的图层。

```ts
map.removeAllLayer();
```

### zoomIn

地图放大一级。

```ts
map.zoomIn();
```

### zoomOut

地图缩小一级。

```ts
map.zoomOut();
```

### setPitch

设置地图倾角。

```ts
map.setPitch(pitch: number);
```

### fitBounds

设置地图缩放范围。

```ts
map.fitBounds(bound: Bounds);
```

### addZoomControl

添加地图缩放器控件。

```ts
map.addZoomControl(options: IZoomControlOptions);
```

### removeZoomControl

移除地图缩放器控件。

```ts
map.removeZoomControl();
```

### addScaleControl

添加地图比例尺控件。

```ts
map.addScaleControl(options: IScaleControlOptions);
```

### removeScaleControl

移除地图比例尺控件。

```ts
map.removeScaleControl();
```

### addLayerMenuControl

添加地图图层列表控件。

```ts
map.addLayerMenuControl(options: ILayerMenuControlOptions);
```

### removeLayerMenuControl

移除地图图层列表控件。

```ts
map.removeLayerMenuControl();
```

### addLegendControl

添加图例控件。

```ts
map.addLegendControl(options: ILegendOptions);
```

### removeLegendControl

移除图例控件。

```ts
map.removeLegendControl();
```

### exportPng

```ts
map.exportPng(type?: 'png' | 'jpg');
```

### on

绑定事件。

```ts
map.on(event: string, callback: Function);
```

### once

绑定一次事件。

```ts
map.once(event: string, callback: Function);
```

### off

解绑事件。

```ts
map.off(event?: string, callback?: Function);
```

### destroy

```ts
map.destroy();
```

## 四、事件

### 事件监听

#### 绑定事件

```ts
map.on(event: string, callback: Function);
```

#### 绑定一次事件

```ts
map.once(event: string, callback: Function);
```

#### 解绑事件

```ts
map.off(event?: string, callback?: Function);
```

### 事件类别

#### 地图事件

- 生命周期事件
  - loaded：加载完成事件。
  - scene-loaded：scene 加载完成事件。
  - destroy：销毁事件。
- resize：地图容器大小改变事件。
- 地图容器事件
  - mapmove：地图平移时触发事件。
  - movestart：地图平移开始时触发。
  - moveend：地图移动结束后触发，包括平移，以及中心点变化的缩放。如地图有拖拽缓动效果，则在缓动结束后触发。
  - zoomchange：地图缩放级别更改后触发。
  - zoomstart：缩放开始时触发。
  - zoomend：缩放停止时触发。
- click：单击事件。
- dblclick：双击事件。
- contextmenu：右键事件。
- 滑动事件
  - mousemove：鼠标在地图上移动时触发。
  - mousewheel：鼠标滚轮开始缩放地图时触发。
  - mouseover：鼠标移入地图容器内时触发。
  - mouseout：鼠标移出地图容器时触发。
  - mouseup：鼠标在地图上单击抬起时触发。
  - mousedown：鼠标在地图上单击按下时触发。
- 拖动事件
  - dragstart：开始拖拽地图时触发。
  - dragging：拖拽地图过程中触发。
  - dragend：停止拖拽地图时触发。如地图有拖拽缓动效果，则在拽停止，缓动开始前触发。

#### 图层事件

- 生命周期事件
  - layerName:inited：图层初始化完成事件。
  - layerName:add：图层添加到场景 scene 事件。
  - layerName:remove：图层移除时事件。
  - layerName:dataUpdate：图层数据源更新事件。
- 单击事件
  - layerName:click：左键点击图层事件。
  - layerName:unclick：图层外左键点击事件。
- 右键事件
  - layerName:contextmenu：图层要素点击右键菜单事件。
  - layerName:uncontextmenu：图层外点击右键事件。
- 滑动事件
  - layerName:mouseenter：鼠标进入图层要素事件。
  - layerName:mousemove：鼠标在图层上移动时触发事件。
  - layerName:unmousemove：图层外鼠标移动事件。
  - layerName:mouseout：鼠标移出图层要素事件。
  - layerName:mouseup：鼠标在图层上单击抬起事件。
  - layerName:unmouseup：图层外鼠标抬起。
  - layerName:mousedown：鼠标在图层上单击按下事件。
  - layerName:unmousedown：图层外单击按下事件。
- layerName:unpick： 图层外的操作的所有事件。

#### 组件事件

##### Tooltip

- tooltip:show：显示事件。
- tooltip:hide：隐藏事件。

## 五、资源注册

### 注册图片资源

#### registerImage(id: string, image: IImage)

注册单个图片。

params:

- id: `string`
- image: `HTMLImageElement|File|string`

```js
registerImage('01', 'https://l7plot.antv.vision/xxx.svg');
```

#### registerImages(images)

注册多个图片。

params:

- images: `Array`
  - id: `string`
  - image: `HTMLImageElement|File|string`

```js
const images = [{ id: '01', image: 'https://l7plot.antv.vision/xxx.svg' }];
registerImages(images);
```

### 注册字体资源

#### registerFontFace(fontFamily: string, fontPath: string)

注册字体。

params:

- fontFamily: `string`
- fontPath: `string`

```js
registerFontFace('iconfont', 'https://l7plot.antv.vision/xxx.woff2');
```

### 注册 iconfont 映射

#### registerIconFont(name: string, fontUnicode: string)

注册单个 iconfont 映射。

params:

- name: `string`
- fontUnicode: `string`

```js
registerIconFont('icon1', '&#xe64b;');
```

#### registerIconFonts(iconFonts)

注册多个 iconfont 映射。

params:

- iconFonts
  - name: `string`
  - fontUnicode: `string`

```js
const iconFonts = [{ name: 'icon1', fontUnicode: '&#xe64b;' }];
registerIconFonts(iconFonts);
```
