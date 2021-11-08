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
    data: [{
        path: [[58.00, 32.84],[85.7, 25.161],[101.95, 41.77],[114.96, 39.63],[117.421, 28.61]],
        s: 2,
        t: 3,
        n: 'chengdu'
      }],
    parser: { type: 'json', coordinates: 'path', }
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
