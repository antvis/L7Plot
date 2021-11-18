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
