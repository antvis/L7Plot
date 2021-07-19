import { SymbolMap, registerImages } from '@antv/l7plot';

const images = [
  { id: '01', image: 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg' },
  { id: '02', image: 'https://gw.alipayobjects.com/zos/basement_prod/30580bc9-506f-4438-8c1a-744e082054ec.svg' },
  { id: '03', image: 'https://gw.alipayobjects.com/zos/basement_prod/7aa1f460-9f9f-499f-afdf-13424aa26bbf.svg' },
];
registerImages(images);

async function initMap() {
  const response = await fetch(
    'https://gw.alipayobjects.com/os/basement_prod/893d1d5f-11d9-45f3-8322-ee9140d288ae.json'
  );
  const data = await response.json();

  const symbolMap = new SymbolMap('container', {
    map: {
      type: 'mapbox',
      style: 'dark',
      center: [121.409765, 31.256735],
      zoom: 14.5,
      pitch: 0,
    },
    source: {
      data: data,
      parser: {
        type: 'json',
        x: 'longitude',
        y: 'latitude',
      },
    },
    shape: {
      field: 'name',
      value: ['01', '02', '03'],
    },
    size: 20,
  });
}

initMap();
