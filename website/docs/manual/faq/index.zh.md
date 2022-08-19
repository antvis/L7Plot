---
title: FAQ
order: 2
---

## FAQ

以下整理了一些 L7Plot 社区常见的问题和官方答复，提问或新增 issue 前先看看。

### 地图相关

#### 1. 如何自定义底图样式？

地图底图容器类型支持两种类型：AMap 高德、MapBox。除常见的样式外，如需要自定义底图样式，需到各自厂商的开发者中心自定义底图样式，关于使用详见 API style

```js
{
  style: 'amap://styles/2a09079c3daac9420ee53b67307a8006?isPublic=true';
}
```

#### 2. 底图可以自定义其它底图服务吗，比如 MapBox、osm、天地图或者自己发布的瓦片、矢量切片地图服务 ？

地图底图容器类型支持两种类型：AMap 高德、MapBox。对于自己发的服务与其它服务，可借助 MapBox 底图容器能力，加载它支持的服务，MapBox 目前支持的服务规范有：瓦片服务(OpenStreetMap 规范)、MapBox 规范矢量瓦片地图服务。

#### 3. 图表实例上没有暴露 L7 上的 getZoom 等方法怎么搞？

```js
// 通过实例
const scene = plot.scene;
// 或
const scene = plot.getScene();

plot.on('loaded', () => {
  scene.getZoom();
  // ...
});
```

#### 4. 如何禁止地图的交互状态？

使用不同的底图，配置地图的交互状态不一样，API 文档有说明，各配置项可详见高德、Mapbox 官网。比如要禁止地图的缩放与拖拽操作：

- 高德地图

```js
{
  map: {
    type: 'amap',
    zoomEnable: false,
    dragEnable: false,
  }
}
```

- Mapbox

```js
{
  map: {
    type: 'mapbox',
    dragPan: false,
    scrollZoom: false,
  }
}
```

### 组件相关

#### 1. Tooltip 怎么使用 JSX ?

可利用 customContent API 实现自定义 DOM 内容。

```tsx
customContent (title: string, items: TooltipListItem[]) {
  const container = document.createElement('div');
  const portal = ReactDOM.createPortal(<div>{JSON.stringify(items)}</div>, container);
  ReactDOM.render(portal, container);
  return container;
}
```

> 更多[常见问题](https://www.yuque.com/antv/l7/fdaew2)
