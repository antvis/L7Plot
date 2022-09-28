### `options.`style

`RasterLayerStyleOptions` optional

RasterLayerStyleOptions 配置如下：

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
    opacity: 1,
  }
}
```
