import { ClusterState, OriginLocation } from '../../types';
import { clusterByHCA } from './hca';

export function clusterLocations(locations: OriginLocation[], state: ClusterState) {
  if (state.clusterType === 'HCA') {
    return clusterByHCA(locations, state);
  }
  return [];
}

export { clusterFlows } from './flows';
