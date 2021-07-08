export const SceneEventList: { original: string; adaptation: string }[] = [
  // scene 初始化完成事件
  { original: 'loaded', adaptation: 'scene-loaded' },
  // 地图容器变化事件
  { original: 'resize', adaptation: 'resize' },
  // scene 摧毁事件
  { original: 'destroy', adaptation: 'destroy' },
  // 地图容器变化事件
  { original: 'resize', adaptation: 'resize' },
];

export const MapEventList: string[] = [
  // 地图事件
  'mapmove',
  'movestart',
  'moveend',
  'zoomchange',
  'zoomstart',
  'zoomend',

  // 鼠标事件
  // 单击事件
  'click',
  // 双击事件
  'dblclick',
  // 右键事件
  'contextmenu',
  // mouse 事件
  'mousemove',
  'mousewheel',
  'mouseover',
  'mouseout',
  'mouseup',
  'mousedown',
  // drag 事件
  'dragstart',
  'dragging',
  'dragend',
];
