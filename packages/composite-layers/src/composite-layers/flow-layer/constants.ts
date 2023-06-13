import { FlowLayerOptions } from './types';

export const DEFAULT_OPTIONS: FlowLayerOptions = {
  source: {
    data: [],
    parser: {
      type: 'json',
      x: 'f_lon',
      y: 'f_lat',
      x1: 't_lon',
      y1: 't_lat',
      weight: 'weight',
    },
  },
  clusterType: 'HCA',
  clusterZoomStep: 1,
  clusterNodeSize: 64,
  clusterRadius: 40,
  clusterExtent: 512,
  maxTopFlowNum: 5000,
  circleColor: '#fff',
  circleRadius: {
    field: 'weight',
    value: [1, 16],
  },
  circleStrokeColor: '#000',
  circleStrokeWidth: 1,
  lineColor: {
    field: 'weight',
    value: ['#2a5674', '#d1eeea'],
  },
  lineWidth: {
    field: 'weight',
    value: [1, 16],
  },
  fadeOpacityEnabled: true,
  fadeOpacityAmount: 0,
};
