### `options.`size

`number|object|Function` optional default: `12`

元素大小。

```js
{ size: 12, }
```

#### `size.`field

`string` optional

元素大小值映射关联字段。

```js
{
  size: { field: 't', }
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

<embed src="@/docs/common/attribute/scale.zh.md"></embed>

```js
{
  size: {
    field: 't',
    value: [12, 15],
    scale: { type: 'quantile' },
  }
}
```
