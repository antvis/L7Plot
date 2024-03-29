### `options.`style

`PointLayerStyleOptions` optional

元素样式, PointLayerStyleOptions 配置如下：

| 属性        | 描述         | 类型                                              | 默认值  | 是否必填 |
| ----------- | ------------ | ------------------------------------------------- | ------- | -------- |
| opacity     | 透明度       | `number` &#124; `[string, (data: any) => number]` | `1`     | optional |
| stroke      | 边线填充颜色 | `string`                                          |         | optional |
| strokeWidth | 描边的宽度   | `number`                                          |         | optional |
| unit        | 点大小单位   | `'pixel'` &#124; `'meter'`                        | `pixel` | optional |

```js
{
  style: {
    opacity: 0.8,
    stroke: 'white',
    strokeWidth: 2,
    unit: 'pixel',
  }
}
```

#### `style.`unit

`'pixel' | 'meter'` optional default: `'pixel'`

- pixel 默认值
- meter 单位为米
