import { FieldGetter, FlowItem, LocationItem, LocationLevel } from '@antv/l7-composite-layers';

export const mockData = [
  {
    lng1: 1,
    lat1: 1,
    lng2: 2,
    lat2: 2,
    value: 1,
  },
  {
    lng1: 1,
    lat1: 1,
    lng2: 3,
    lat2: 3,
    value: 2,
  },
  {
    lng1: 2,
    lat1: 2,
    lng2: 3,
    lat2: 3,
    value: 3,
  },
  {
    lng1: 1,
    lat1: 1,
    lng2: 2,
    lat2: 2,
    value: 1,
  },
];

export const mockDataFieldGetter: FieldGetter = {
  fromLng: 'lng1',
  fromLat: 'lat1',
  toLng: 'lng2',
  toLat: 'lat2',
  weight: 'value',
};

export const mockLocations: LocationItem[] = [
  {
    id: '603e5177-044e-7f09-c6ab-f9df17666f43',
    lng: 1,
    lat: 1,
    childIds: [],
    isCluster: false,
    originData: [
      { lng1: 1, lat1: 1, lng2: 2, lat2: 2, value: 1 },
      { lng1: 1, lat1: 1, lng2: 3, lat2: 3, value: 2 },
      { lng1: 1, lat1: 1, lng2: 2, lat2: 2, value: 1 },
    ],
    weight: 4,
    x: 0.5027777777777778,
    y: 0.49722208118489825,
  },
  {
    id: '0e1ec737-1914-c612-e86f-49ad29af38ce',
    lng: 2,
    lat: 2,
    childIds: [],
    isCluster: false,
    originData: [
      { lng1: 1, lat1: 1, lng2: 2, lat2: 2, value: 1 },
      { lng1: 2, lat1: 2, lng2: 3, lat2: 3, value: 3 },
      { lng1: 1, lat1: 1, lng2: 2, lat2: 2, value: 1 },
    ],
    weight: 5,
    x: 0.5055555555555555,
    y: 0.4944433158879836,
  },
  {
    id: 'a47d53eb-c4fc-4495-943d-afff0012b8ed',
    lng: 3,
    lat: 3,
    childIds: [],
    isCluster: false,
    originData: [
      { lng1: 1, lat1: 1, lng2: 3, lat2: 3, value: 2 },
      { lng1: 2, lat1: 2, lng2: 3, lat2: 3, value: 3 },
    ],
    weight: 5,
    x: 0.5083333333333333,
    y: 0.49166285633707063,
  },
];

export const mockFlows: FlowItem[] = [
  {
    id: 'b605b245-55b4-db3b-1208-f65765a9f80f',
    childIds: [],
    isCluster: false,
    originData: [
      { lng1: 1, lat1: 1, lng2: 2, lat2: 2, value: 1 },
      { lng1: 1, lat1: 1, lng2: 2, lat2: 2, value: 1 },
    ],
    weight: 2,
    fromId: '603e5177-044e-7f09-c6ab-f9df17666f43',
    fromLng: 1,
    fromLat: 1,
    toId: '0e1ec737-1914-c612-e86f-49ad29af38ce',
    toLng: 2,
    toLat: 2,
  },
  {
    id: '6e6658b8-f8cd-0f90-233e-9fe38a2d9193',
    childIds: [],
    isCluster: false,
    originData: [{ lng1: 1, lat1: 1, lng2: 3, lat2: 3, value: 2 }],
    weight: 2,
    fromId: '603e5177-044e-7f09-c6ab-f9df17666f43',
    fromLng: 1,
    fromLat: 1,
    toId: 'a47d53eb-c4fc-4495-943d-afff0012b8ed',
    toLng: 3,
    toLat: 3,
  },
  {
    id: '13df60b0-79b1-28bc-2fb1-f79428c98fb6',
    childIds: [],
    isCluster: false,
    originData: [{ lng1: 2, lat1: 2, lng2: 3, lat2: 3, value: 3 }],
    weight: 3,
    fromId: '0e1ec737-1914-c612-e86f-49ad29af38ce',
    fromLng: 2,
    fromLat: 2,
    toId: 'a47d53eb-c4fc-4495-943d-afff0012b8ed',
    toLng: 3,
    toLat: 3,
  },
];
