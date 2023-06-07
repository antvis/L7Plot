import { ClusterFlow, TrafficFlow } from '../../types';
import { buildIndex } from '../build-index';

/**
 * 计算客流聚合线
 * @param originFlows
 * @param clusterIndex
 * @param zoom
 * @returns
 */
export function clusterFlows(
  originFlows: TrafficFlow[],
  clusterIndex: ReturnType<typeof buildIndex>,
  zoom: number
): ClusterFlow[] {
  const clusterFlowMap = new Map<string, ClusterFlow>();
  // 最底层的 location Id 数组（去重后）
  const { zoom: targetZoom } = clusterIndex.getAppropriateLevel(zoom);
  originFlows.forEach(({ fromId, toId, weight }) => {
    const fromCluster = clusterIndex.findClusterForZoom(fromId, targetZoom);
    const toCluster = clusterIndex.findClusterForZoom(toId, targetZoom);

    if (!fromCluster || !toCluster || fromCluster.id === toCluster.id) {
      return;
    }
    const clusterFlowId = `${fromCluster.id}-${toCluster.id}`;
    let clusterFlow = clusterFlowMap.get(clusterFlowId);
    if (!clusterFlow) {
      clusterFlow = {
        id: clusterFlowId,
        fromId: fromCluster.id,
        fromLng: fromCluster.lng,
        fromLat: fromCluster.lat,
        toId: toCluster.id,
        toLng: toCluster.lng,
        toLat: toCluster.lat,
        weight: 0,
      };
      clusterFlowMap.set(clusterFlowId, clusterFlow);
    }
    clusterFlow.weight += weight;
  });

  return Array.from(clusterFlowMap.values()).sort((a, b) => a.weight - b.weight);
}
