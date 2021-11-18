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
    data: [{
        path: [[58.00, 32.84],[85.7, 25.161],[101.95, 41.77],[114.96, 39.63],[117.421, 28.61]],
        c: 'red',
        t: 20,
        n: 'chengdu'
      }],
    parser: { type: 'json', coordinates: 'path', }
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
