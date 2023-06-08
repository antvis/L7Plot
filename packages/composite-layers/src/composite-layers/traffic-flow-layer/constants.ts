import { TrafficFlowLayerOptions } from './types';

export const DEFAULT_OPTIONS: TrafficFlowLayerOptions = {
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
  color: '#fff',
  radius: {
    field: 'weight',
    value: [1, 16],
  },
  lineColor: {
    field: 'weight',
    value: ['#2a5674', '#d1eeea'],
  },
  lineSize: {
    field: 'weight',
    value: [1, 16],
  },
  fadeOpacityEnabled: true,
  fadeOpacityAmount: 0,
};
