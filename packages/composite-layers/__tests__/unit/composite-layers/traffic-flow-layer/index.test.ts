import { mockDataFieldGetter, mockData, mockLocations, mockFlows } from './mock';
import { DataService } from '../../../../src/composite-layers/traffic-flow-layer/data-service';
import {
  createUuid,
  lat2Y,
  lng2X,
  x2Lng,
  y2Lat,
} from '../../../../src/composite-layers/traffic-flow-layer/data-service/utils';
import { ClusterStyle, TrafficFlowLayer } from '@antv/l7-composite-layers';
import { DataServiceEvent } from '../../../../src/composite-layers/traffic-flow-layer/data-service/constants';
import { initOriginData } from '../../../../src/composite-layers/traffic-flow-layer/data-service/init';
import {
  getFlowLevels,
  getLocationLevels,
  getSearchTree,
  getStyleLevels,
} from '../../../../src/composite-layers/traffic-flow-layer/data-service/cluster';

describe('traffic flow layer', () => {
  it('position transform', () => {
    const randomLng = Math.random() * 360 - 180;
    const randomLat = Math.random() * 180 - 90;
    expect(x2Lng(lng2X(randomLng)).toFixed(6)).toBe(randomLng.toFixed(6));
    expect(y2Lat(lat2Y(randomLat)).toFixed(6)).toBe(randomLat.toFixed(6));
  });

  it('uuid', () => {
    const idSet = new Set();
    const TEST_COUNT = 100;
    for (let i = 0; i < TEST_COUNT; i++) {
      idSet.add(createUuid());
    }
    expect(idSet.size).toBe(TEST_COUNT);
  });

  it('traffic flow layer', () => {
    const trafficsFlowLayer = new TrafficFlowLayer({
      cluster: {
        clusterType: 'HCA',
        zoomStep: 1,
      },
      fieldGetter: mockDataFieldGetter,
      source: {
        data: mockData,
      },
    });

    const dataService = trafficsFlowLayer.getDataService();
    dataService.setMapStatus({
      minZoom: 1,
      maxZoom: 15,
    });

    return new Promise<void>((resolve) => {
      dataService.on(DataServiceEvent.Init, () => {
        expect(dataService.getLocationFlowLevels().length).toBeGreaterThan(0);
        resolve();
      });
    });
  });

  it('initData', () => {
    const { locations, flows } = initOriginData(mockData, mockDataFieldGetter);
    expect(locations.length).toBe(3);
    expect(flows.length).toBe(3);
  });

  it('getSearchTree', () => {
    const tree = getSearchTree(mockLocations);
    expect(tree.points.length).toBe(3);
  });

  // it('hca cluster', async () => {
  //   const hcaDataService = new DataService({
  //     data: mockData,
  //     fieldGetter: mockDataFieldGetter,
  //     cluster: {
  //       clusterType: 'HCA',
  //       zoomStep: 1,
  //     },
  //     locationLayerStyle: {},
  //     flowLayerStyle: {},
  //     overflowLimit: 10000,
  //   });
  //   await hcaDataService.setMapStatus({
  //     minZoom: 1,
  //     maxZoom: 15,
  //   });
  //   expect(hcaDataService.getLocationFlowLevels().length).toBeGreaterThan(0);
  // });

  it('hca location cluster', () => {
    const locationLevels = getLocationLevels(
      mockLocations,
      {
        clusterType: 'HCA',
        zoomStep: 1,
      },
      {
        minZoom: 1,
        maxZoom: 15,
      }
    );
    expect(locationLevels.length).toBeGreaterThan(0);
  });

  it('h3 location cluster', () => {
    const locationLevels = getLocationLevels(
      mockLocations,
      {
        clusterType: 'H3',
        zoomStep: 1,
        h3Range: [1, 15],
      },
      {
        minZoom: 1,
        maxZoom: 15,
      }
    );
    expect(locationLevels.length).toBeGreaterThan(0);
  });

  // it('flows', async () => {
  //   const locationLevels = getLocationLevels(
  //     mockLocations,
  //     {
  //       clusterType: 'HCA',
  //       zoomStep: 1,
  //     },
  //     {
  //       minZoom: 1,
  //       maxZoom: 15,
  //     }
  //   );
  //   const flowLevels = await getFlowLevels(mockFlows, locationLevels, {
  //     clusterType: 'HCA',
  //     zoomStep: 1,
  //   });
  //   expect(flowLevels.length).toBe(locationLevels.length);
  // });

  it('style', () => {
    const locationLevels = getLocationLevels(
      mockLocations,
      {
        clusterType: 'HCA',
        zoomStep: 1,
      },
      {
        minZoom: 1,
        maxZoom: 15,
      }
    );
    const clusterStyle: ClusterStyle = {
      color: {
        field: 'weight',
        value: ['#000', '#fff'],
      },
    };
    const styleLevels = getStyleLevels(locationLevels, clusterStyle);
    expect(styleLevels.length).toBe(locationLevels.length);
  });
});
