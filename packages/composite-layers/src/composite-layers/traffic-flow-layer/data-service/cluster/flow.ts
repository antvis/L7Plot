import { FlowItem, FlowLevel, LocationLevel, LocationMap } from '../types';
import { createUuid } from '../utils';
import { createFlowItem } from '../init';

/**
 * 获取所有层级的聚合线数据
 * @param flows
 * @param locationLevels
 */
export function getFlowLevels(flows: FlowItem[], locationLevels: LocationLevel[]): FlowLevel[] {
  if (!locationLevels.length || !flows.length) {
    return [];
  }
  let oldZoom = locationLevels[0].zoom;
  let oldLocationMap = locationLevels[0].locationMap;
  let oldFlows = [...flows];
  // 存储最高缩放比下的原始数据
  const flowLevels: FlowLevel[] = [
    {
      zoom: oldZoom,
      flows: oldFlows,
    },
  ];

  for (let index = 1; index < locationLevels.length; index++) {
    const { zoom: newZoom, locationMap: newLocationMap } = locationLevels[index];
    const newFlows = getFlows(oldFlows, oldLocationMap, newLocationMap, newZoom);

    flowLevels.push({
      zoom: newZoom,
      flows: newFlows,
    });

    oldFlows = newFlows;
    oldZoom = newZoom;
    oldLocationMap = newLocationMap;
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
  const flowsMap = new Map<string, FlowItem[]>();
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
        const clusterFromLocation =
          (preFromLocation?.clusterId && newLocationMap.get(preFromLocation?.clusterId)) || undefined;
        if (clusterFromLocation) {
          fromLocation = clusterFromLocation;
        }
      }
      if (!toLocation) {
        const preToLocation = oldLocationMap.get(toId);
        const clusterToLocation =
          (preToLocation?.clusterId && newLocationMap.get(preToLocation?.clusterId)) || undefined;
        if (clusterToLocation) {
          toLocation = clusterToLocation;
        }
      }
      if (fromLocation && toLocation) {
        newFlow = createFlowItem(
          {
            ...flow,
            id: createUuid(),
          },
          fromLocation,
          toLocation
        );
      }
    }
    if (newFlow.fromId !== newFlow.toId) {
      const key = `${newFlow.fromId},${newFlow.toId}`;
      flowsMap.set(key, (flowsMap.get(key) ?? []).concat(newFlow));
    }
  }
  flowsMap.forEach((flowList) => {
    // 当起终点相同的flows长度 > 1时，则需要进行线路聚合。
    if (flowList.length > 1) {
      const { fromId, toId, fromLat, toLat, fromLng, toLng } = flowList[0];
      newFLows.push(
        createFlowItem(
          {
            id: createUuid(),
            isCluster: true,
            originData: [],
            weight: flowList.map((link) => link.weight).reduce((a, b) => a + b, 0),
            childIds: flowList.map((flow) => flow.id),
          },
          { id: fromId, lng: fromLng, lat: fromLat },
          { id: toId, lng: toLng, lat: toLat }
        )
      );
    } else if (flowList[0]) {
      newFLows.push(flowList[0]);
    }
  });
  return newFLows.sort((a, b) => a.weight - b.weight);
}
