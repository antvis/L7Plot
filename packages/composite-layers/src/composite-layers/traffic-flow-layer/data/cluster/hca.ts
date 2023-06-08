import KDBush from 'kdbush';
import { ClusterLevel, ClusterLocation, ClusterLocationKDBush, ClusterState, TrafficLocation } from '../../types';
import { getLocationId } from '../../utils';
import { latY, lngX, xLng, yLat } from '../transform';

const getX = (location: ClusterLocation) => location.x;
const getY = (location: ClusterLocation) => location.y;

/**
 * 创建检索数
 * @param clusters
 * @param nodeSize
 * @returns
 */
function createKDTree(clusters: ClusterLocation[], nodeSize: number) {
  return new KDBush(
    clusters,
    getX,
    getY,
    nodeSize,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.Float32Array
  );
}

/**
 * 创建聚合结点
 * @param x
 * @param y
 * @param childIds
 * @param weight
 * @param id
 * @returns
 */
function createCluster(x: number, y: number, childIds: string[], weight: number, id: string): ClusterLocation {
  return {
    id,
    lng: xLng(x),
    lat: yLat(y),
    x,
    y,
    zoom: Infinity,
    weight,
    childIds,
  };
}

function getNextClusters(
  points: ClusterLocation[],
  zoom: number,
  tree: ClusterLocationKDBush,
  { clusterRadius, clusterExtent }: ClusterState
) {
  const clusters: ClusterLocation[] = [];
  const r = clusterRadius / (clusterExtent * Math.pow(2, zoom));

  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    if (p.zoom <= zoom) {
      continue;
    }
    p.zoom = zoom;

    const neighborIds = tree.within(p.x, p.y, r);

    let weight = p.weight || 1;
    const childIds = [p.id];
    let wx = p.x * weight;
    let wy = p.y * weight;

    const id = getLocationId();

    for (const neighborId of neighborIds) {
      const childPoint = tree.points[neighborId];
      if (childPoint.zoom <= zoom) {
        continue;
      }
      childPoint.zoom = zoom;

      const weight2 = childPoint.weight || 1;
      wx += childPoint.x * weight2;
      wy += childPoint.y * weight2;

      weight += weight2;
      childIds.push(childPoint.id);
      childPoint.parentId = id;
    }

    if (childIds.length <= 1) {
      clusters.push(p);
    } else {
      p.parentId = id;
      clusters.push(createCluster(wx / weight, wy / weight, childIds, weight, id));
    }
  }
  return clusters;
}

/**
 * 根据 HCA 算法生成各个层级下的聚合点
 * @param locations
 * @param state
 * @returns
 */
export function clusterByHCA(locations: TrafficLocation[], state: ClusterState) {
  const { minZoom, maxZoom, clusterZoomStep, clusterNodeSize } = state;
  const trees: (ClusterLocationKDBush | undefined)[] = [];
  let clusters: ClusterLocation[] = locations
    .map((location) => ({
      ...location,
      x: lngX(location.lng),
      y: latY(location.lat),
      weight: location.weight,
      zoom: Infinity,
      childIds: [],
    }))
    .sort((a, b) => a.weight - b.weight);

  trees[maxZoom + 1] = createKDTree(clusters, clusterNodeSize);
  let prevZoom = maxZoom + 1;
  for (let zoom = maxZoom; zoom >= minZoom; zoom -= clusterZoomStep) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newClusters = getNextClusters(clusters, zoom, trees[prevZoom]!, state);
    if (newClusters.length === clusters.length) {
      trees[zoom] = trees[prevZoom];
      trees[prevZoom] = undefined;
      prevZoom = zoom;
    } else {
      prevZoom = zoom;
      clusters = newClusters.sort((a, b) => a.weight - b.weight);
      trees[zoom] = createKDTree(clusters, clusterNodeSize);
    }
  }

  if (trees.length === 0) {
    return [];
  }

  const clusterLevels: ClusterLevel[] = [];
  for (let zoom = trees.length - 1; zoom >= 0; zoom--) {
    const tree = trees[zoom];
    const locations = tree?.points ?? [];
    if (locations.length && tree) {
      clusterLevels.push({
        locations: Array.from(tree?.points ?? []).map((item) => {
          item.zoom = zoom;
          return item;
        }),
        locationTree: tree,
        zoom,
      });
    }
  }

  return clusterLevels;
}
