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
  zoomStep: 1,
  nodeSize: 64,
  radius: 40,
  extent: 512,
  maxTopFlowNum: 5000,
  locationColor: '#fff',
  locationSize: {
    field: 'weight',
    value: [1, 16],
  },
  flowColor: {
    field: 'weight',
    value: ['#2a5674', '#d1eeea'],
  },
  flowSize: {
    field: 'weight',
    value: [1, 16],
  },
  fadeEnabled: true,
  fadeAmount: 0,
};
