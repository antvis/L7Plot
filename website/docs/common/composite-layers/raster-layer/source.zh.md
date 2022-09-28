### `options.`source

`SourceOptions` required

数据配置，详见 [Source](/zh/docs/api/source)。

```js
async function getTiffData() {
  const response = await fetch('https://gw.alipayobjects.com/os/rmsportal/XKgkjjGaAzRyKupCBiYW.dat');
  const arrayBuffer = await response.arrayBuffer();
  const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
  const image = await tiff.getImage();
  const width = image.getWidth();
  const height = image.getHeight();
  const values = await image.readRasters();
  return {
    data: values[0],
    width,
    height,
    min: 0,
    max: 8000,
  };
}

const tiffdata = await getTiffData();
```

```js
{
  source: {
    tiffdata.data: Unit8Array,
    {
      parser: {
          type: 'raster',
          width: tiffdata.width,
          height: tiffdata.height,
          min: 0,
          max: 80,
          extent: [73.482190241, 3.82501784112, 135.106618732, 57.6300459963],
        },
    }
  }
}
```
