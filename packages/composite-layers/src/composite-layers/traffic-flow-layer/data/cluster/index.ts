import { ClusterState, TrafficLocation } from '../../types';
import { clusterByHCA } from './hca';

export function clusterLocations(locations: TrafficLocation[], state: ClusterState) {
  if (state.clusterType === 'HCA') {
    return clusterByHCA(locations, state);
  }
  return [];
}

export { clusterFlows } from './flows';
