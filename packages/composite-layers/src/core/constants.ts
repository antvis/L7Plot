export const OriginLayerEventList: string[] = [
  // 图层事件
  'inited',
  // 代理掉的事件 'add', 'remove',
  'dataUpdate',
  // 数据映射更新，图例更新事件
  'legend',
  'legend:color',
  'legend:size',
  // 鼠标事件
  // 单击事件
  'click',
  'dblclick',
  'unclick',
  // 右键事件
  'contextmenu',
  'uncontextmenu',
  // mouse 事件
  'mouseenter',
  'mousemove',
  'unmousemove',
  'mouseout',
  'mouseup',
  'unmouseup',
  'mousedown',
  'uncontextmenu',
  'unpick',
];

export enum CoreLayerEvent {
  CREATED = 'created',
  ADD = 'add',
  REMOVE = 'remove',
}

export enum CompositeLayerEvent {
  CREATED = 'created',
  ADD = 'add',
  REMOVE = 'remove',
}
