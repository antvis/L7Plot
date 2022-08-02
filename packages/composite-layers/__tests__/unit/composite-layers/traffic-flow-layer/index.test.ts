import { initOriginData } from '../../../../src/composite-layers/traffic-flow-layer/data-service/init';
import { flowData } from './data';
import { getLocationLevels } from '../../../../src/composite-layers/traffic-flow-layer/data-service/cluster/location';
import { getFlowLevels } from '../../../../src/composite-layers/traffic-flow-layer/data-service/cluster/flow';

describe('traffic flow layer', () => {
  const { locations, flows } = initOriginData(flowData, {
    fromLng: 'lng1',
    fromLat: 'lat1',
    toLng: 'lng2',
    toLat: 'lat2',
    weight: 'value',
  });

  const hcaLocationLevels = getLocationLevels(
    locations,
    {
      zoomStep: 1,
      clusterType: 'hca',
    },
    {
      maxZoom: 15,
      minZoom: 1,
    }
  );

  // 判断初始化函数是否生效
  it('init flow data', () => {
    expect(locations.length).toBe(3);
    expect(flows.length).toBe(3);
  });

  it('location cluster', () => {
    expect(hcaLocationLevels).toBeInstanceOf(Array);
  });

  it('flow cluster', async () => {
    const flowLevels = await getFlowLevels(flows, hcaLocationLevels, {
      zoomStep: 1,
      clusterType: 'hca',
    });
    expect(flowLevels).toBeInstanceOf(Array);
  });
});
