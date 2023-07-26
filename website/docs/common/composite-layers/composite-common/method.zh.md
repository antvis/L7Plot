### addTo

添加到场景。

```js
layer.addTo(scene: Scene);
```

### remove

从场景移除。

```js
layer.remove();
```

### update

更新配置且重新渲染。

```js
layer.update(options: Partial<LayerOptions>);
```

### changeData

更新数据。

```js
layer.changeData(source: SourceOptions);
```

### setIndex

设置图层层叠值。

```js
layer.setIndex();
```

### setBlend

设置图层的元素混合配置。

```js
layer.setBlend();
```

### setMinZoom

设置图层可见最小缩放层级。

```js
layer.setMinZoom();
```

### setMaxZoom

设置图层可见最大缩放层级。

```js
layer.setMaxZoom();
```

### show

显示图层。

```js
layer.show();
```

### hide

隐藏图层。

```js
layer.hide();
```

### toggleVisible

切换图层显隐状态。

```js
layer.toggleVisible();
```

### isVisible

图层是否可见。

```js
layer.isVisible() : boolean;
```

### fitBounds

图层缩放到范围。

```js
layer.fitBounds(fitBoundsOptions?: Bounds);
```

### boxSelect

图层框选数据，bounds 是框选的方框左上角和右下角相对于地图左上角的像素坐标，callback 回调的参数是选中的 feature 对象数组。

```js
layer.boxSelect(bounds: [number, number, number, number], callback: (...args: any[]) => void);
```

### getLegend

获取图例。

```js
layer.getLegend(name: string): ILegend;
```

### state

交互反馈。

#### `active`

`boolean | FLowLayerActiveOptions` optional default: `false`
高亮交互

```js
{
  state: {
    active: false;
  }
}
```

```js
{
  state:{
    active:{
      enableCircleSpread: true,
      enableLineSpread: true,
      circleColor: '#2f54eb',
      circleStrokeColor: '#2f54eb',
      lineColor: '#2f54eb',
      lineStroke: '#2f54eb';
    }
  }
}
```

#### FLowLayerActiveOptions 配置如下：

| 属性               | 描述                         | 类型                                       | 默认值  | 是否必填 |
| ------------------ | ---------------------------- | ------------------------------------------ | ------- | -------- |
| enableCircleSpread | 是否自动高亮该其关联的客流线 | `boolean`                                  | `false` | optional |
| enableLineSpread   | 是否自动高亮该其关联的客流点 | `boolean`                                  | `false` | optional |
| circleColor        | 客流点颜色                   | `string｜PointLayerOptions['color'] `      | `-`     | optional |
| circleStrokeColor  | 客流点边框颜色               | `string｜PointLayerStyleOptions['stroke']` | `-`     | optional |
| lineColor          | 客流线填充颜色               | `string｜LineLayerOptions['color']`        | `-`     | optional |
| lineStroke         | 客流线边框颜色               | `string｜LineLayerStyleOptions['stroke']`  | `-`     | optional |

#### `select`

`boolean | FLowLayerActiveOptions` optional default: `false`
选中交互

```js
{
  state: {
    select: false;
  }
}
```

### getLegendItems

获取图例数据。

```js
layer.getLegendItems(type: string): Record<string, any>[];
```

### getInteractionSubLayers

获取带有交互的子图层，一般用于是否启用 tooltip，图层事件绑定。

```js
layer.getInteractionSubLayers(): ICoreLayer[];
```

### destroy

摧毁。

```js
layer.destroy();
```
