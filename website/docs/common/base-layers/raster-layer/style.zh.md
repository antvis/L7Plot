### `options.`style

`RasterImageTileLayerStyleOptions|RasterDataTileLayerStyleOptions` optional

栅格图层的图片栅格瓦片样式, `RasterImageTileLayerStyleOptions` 配置如下：

| 属性    | 描述   | 类型     | 默认值 | 是否必填 |
| ------- | ------ | -------- | ------ | -------- |
| opacity | 透明度 | `number` | `1`    | optional |

```js
{
  style: {
    opacity: 0.8,
  }
}
```

栅格图层的数据栅格瓦片样式, `RasterDataTileLayerStyleOptions` 配置如下：

| 属性        | 描述                         | 类型               | 默认值     | 是否必填 |
| ----------- | ---------------------------- | ------------------ | ---------- | -------- |
| opacity     | 透明度                       | `number`           | `1`        | optional |
| domain      | 定义域                       | `[number, number]` | `[0, 1]`   | optional |
| noDataValue | 默认空数据                   | `number`           | `-9999999` | optional |
| clampLow    | 是否显示数值小于定义域的内容 | `number`           | `true`     | optional |
| clampHigh   | 是否显示数值大于定义域的内容 | `number`           | `true`     | optional |
| rampColors  | 值域色带                     | `IColorRamp`       |            | required |

值域色带，IColorRamp 配置如下：

| 属性      | 描述       | 类型       | 默认值 | 是否必填 |
| --------- | ---------- | ---------- | ------ | -------- |
| colors    | 颜色       | `string[]` |        | required |
| positions | 热力映射值 | `number[]` |        | required |

```js
{
  style: {
    opacity: 0.8,
    domain: [0, 2000],
      rampColors: {
        colors: [
          '#FF4818',
          '#F7B74A',
          '#FFF598',
          '#91EABC',
          '#2EA9A1',
          '#206C7C',
        ].reverse(),
        positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
      },
  }
}
```
