### `options.`size

`number|SizeStyleAttribute|Function` optional

元素大小。

```js
{ size: 12, }
```

#### `size.`field

`string` optional

元素大小值映射关联字段。

```js
{
  source: {
    data: [{ s: 12, t: 20, n: 'chengdu' }],
    // ...
  },
  size: { field: 's' },
}
```

#### `size.`value

`number|number[]|Function` optional

元素大小值映射值。

```js
{
  size: {
    field: 't',
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
    field: 't',
    value: [12, 15],
    scale: { type: 'quantile' },
  }
}
```
