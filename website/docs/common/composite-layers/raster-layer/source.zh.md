### `options.`source

`SourceOptions` required

数据配置，详见 [Source](/zh/docs/api/source)。

- 配置图片栅格瓦片

```js
{
  source: {
    data: 'http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    parser: {
      type: 'rasterTile',
    },
  },
}
```

- 配置普通栅格图层

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

const source = {
  data: tiffdata.data,
  parser: {
    type: 'raster',
    width: tiffData.width,
    height: tiffData.height,
    min: 0,
    max: 80,
    extent: [73.482190241, 3.82501784112, 135.106618732, 57.6300459963],
  },
};
```

- 配置数据栅格瓦片

```js
{
  source: {
    data: 'http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    parser: {
      type: 'rasterTile',
      dataType: 'arraybuffer',
      tileSize: 256,
      extent: [-180, -85.051129, 179, 85.051129],
      format: async (data: any) => {
        const blob: Blob = new Blob([new Uint8Array(data)], {
          type: 'image/png',
        });
        const img = await createImageBitmap(blob);
        ctx.clearRect(0, 0, 256, 256);
        ctx.drawImage(img, 0, 0, 256, 256);
        const imgData = ctx.getImageData(0, 0, 256, 256).data;
        const arr: number[] = [];
        for (let i = 0; i < imgData.length; i += 4) {
          const R = imgData[i];
          arr.push(R);
        }
        return {
          rasterData: arr,
          width: 256,
          height: 256,
        };
      },
    },
  },
}
```
