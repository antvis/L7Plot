import { ClusterOptions, FlowItem, FlowLevel, FlowMap, LocationLevel, LocationMap } from '../types';
import { createUuid } from '../utils';
import { createFlowItem } from '../init';

/**
 * 获取所有层级的聚合线数据
 * @param flows
 * @param locationLevels
 */
export function getFlowLevels(
  flows: FlowItem[],
  locationLevels: LocationLevel[],
  clusterOptions: ClusterOptions
): FlowLevel[] {
  if (!locationLevels.length || !flows.length) {
    return [];
  }
  const originLocationMap = locationLevels[0].locationMap;
  const originZoom = locationLevels[0].zoom;
  const originFlows = [...flows];

  let previousZoom = originZoom;
  let previousLocationMap = originLocationMap;
  let previousFlows = originFlows;
  // 存储最高缩放比下的原始数据
  const flowLevels: FlowLevel[] = [
    {
      zoom: previousZoom,
      flows: previousFlows,
      flowMap: new Map(previousFlows.map((flow) => [flow.id, flow])),
    },
  ];
  const isHCA = clusterOptions.clusterType === 'HCA';
  for (let index = 1; index < locationLevels.length; index++) {
    const { zoom: newZoom, locationMap: newLocationMap } = locationLevels[index];
    const { flows: newFlows, flowMap: newFlowMap } = getFlows(
      isHCA ? previousFlows : originFlows,
      isHCA ? previousLocationMap : originLocationMap,
      newLocationMap,
      newZoom
    );

    flowLevels.push({
      zoom: newZoom,
      flows: newFlows,
      flowMap: newFlowMap,
    });

    previousFlows = newFlows;
    previousZoom = newZoom;
    previousLocationMap = newLocationMap;
  }
  return flowLevels;
}

/**
 * 获取当前缩放比zoom下对应的flows
 * @param oldFlows：上一层级的flows
 * @param oldLocationMap：上一层级locations对应的Map
 * @param newLocationMap：当前层级locations对应的Map
 * @param zoom：当前地图缩放比
 */
export function getFlows(oldFlows: FlowItem[], oldLocationMap: LocationMap, newLocationMap: LocationMap, zoom: number) {
  const newFLows: FlowItem[] = [];
  // 用于存储相同起终点的flows，如果每条flows长度 > 1，则需要聚合
  const positionFlowMap = new Map<string, FlowItem[]>();
  // console.log(oldFlows);
  for (const flow of oldFlows) {
    let newFlow = flow;
    const { fromId, toId } = newFlow;
    // 尝试从当前层级的locations中获取fromId和toId对应的location对象，若线路起终点在该层级发生了聚合，则获取为空
    let fromLocation = newLocationMap.get(fromId);
    let toLocation = newLocationMap.get(toId);

    // 如果起终点其中一个发生了聚合，则以下判定为true
    if (!fromLocation || !toLocation) {
      // 如果起点id不在当前层级的locations中，则说明起点发生了聚合，就从上一层级的locations中尝试获取起点对象
      if (!fromLocation) {
        const preFromLocation = oldLocationMap.get(fromId);
        // 根据上一层级的locations的clusterId指向当前层级的聚合后的结点
        const clusterFromLocationId =
          preFromLocation?.parentIds?.find((parentId) => newLocationMap.get(parentId)) ?? undefined;
        if (clusterFromLocationId) {
          fromLocation = newLocationMap.get(clusterFromLocationId);
        }
      }
      if (!toLocation) {
        const preToLocation = oldLocationMap.get(toId);
        const clusterToLocationId =
          preToLocation?.parentIds?.find((parentId) => newLocationMap.get(parentId)) ?? undefined;
        if (clusterToLocationId) {
          toLocation = newLocationMap.get(clusterToLocationId);
        }
      }
      if (fromLocation && toLocation) {
        // const hasLocationChange = fromId !== fromLocation.id || toId !== toLocation.id;
        newFlow = createFlowItem(
          {
            ...flow,
          },
          fromLocation,
          toLocation
        );
      }
    }
    if (newFlow.fromId !== newFlow.toId) {
      const key = `${newFlow.fromId},${newFlow.toId}`;
      positionFlowMap.set(key, (positionFlowMap.get(key) ?? []).concat(newFlow));
    }
  }
  const newFlowMap: FlowMap = new Map();
  positionFlowMap.forEach((flowList) => {
    // 当起终点相同的flows长度 > 1时，则需要进行线路聚合。
    if (flowList.length > 1) {
      const { fromId, toId, fromLat, toLat, fromLng, toLng } = flowList[0];
      const clusterFlow = createFlowItem(
        {
          childIds: flowList.map((flow) => flow.id),
          id: createUuid(),
          isCluster: true,
          originData: [],
          weight: flowList.map((link) => link.weight).reduce((a, b) => a + b, 0),
        },
        { id: fromId, lng: fromLng, lat: fromLat },
        { id: toId, lng: toLng, lat: toLat }
      );
      newFLows.push(clusterFlow);
      newFlowMap.set(clusterFlow.id, clusterFlow);
    } else if (flowList[0]) {
      const firstChildFlow = flowList[0]!;
      newFLows.push(firstChildFlow);
      newFlowMap.set(firstChildFlow.id, firstChildFlow);
    }
  });
  return {
    flows: newFLows.sort((a, b) => a.weight - b.weight),
    flowMap: newFlowMap,
  };
}
