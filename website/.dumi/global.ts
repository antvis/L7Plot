/**
 * 增加自己的全局变量，用于 DEMO 中的依赖
 */

if (window) {
  (window as any).l7 = require('@antv/l7');
  (window as any).l7plot = require('@antv/l7plot');
  (window as any).l7CompositeLayers = require('@antv/l7-composite-layers');
  (window as any).react = require('react');
  (window as any).reactDom = require('react-dom');
  (window as any).antd = require('antd');
  (window as any).lilGui = require('lil-gui');
  require('antd/lib/cascader/style/css');
}
